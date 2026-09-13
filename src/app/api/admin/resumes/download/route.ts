import { NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL || 'http://localhost:8085';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'candidate';
    const id = searchParams.get('id') || '';

    if (!id) {
      return NextResponse.json({ ok: false, message: 'Missing record id' }, { status: 400 });
    }

    const backendUrl = `${BACKEND_API_BASE_URL}/api/admin/resumes/download?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`;
    const backendResponse = await fetch(backendUrl);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { ok: false, message: 'Resume or document file not found' },
        { status: backendResponse.status }
      );
    }

    const blob = await backendResponse.blob();
    const contentDisposition = backendResponse.headers.get('content-disposition') || `attachment; filename="document-${id}.pdf"`;
    const contentType = backendResponse.headers.get('content-type') || 'application/octet-stream';

    return new Response(blob, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
      },
    });
  } catch (error) {
    console.error('Resume download proxy error:', error);
    return NextResponse.json({ ok: false, message: 'Failed to download resume file' }, { status: 500 });
  }
}
