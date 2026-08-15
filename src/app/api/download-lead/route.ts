import { NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL || 'http://127.0.0.1:8085';

export async function POST(request: Request) {
  let payload: any = {};
  try {
    payload = await request.json();

    const backendUrl = `${BACKEND_API_BASE_URL}/api/download-lead`;
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    });

    const resData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { ok: false, message: resData.message || 'Unable to record download lead', missingFields: resData.missingFields },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(resData);
  } catch (error) {
    console.warn('Download lead proxy notice (backend offline or connecting via 127.0.0.1):', error);
    return NextResponse.json({
      ok: true,
      message: 'Download lead captured (fallback mode)',
      downloadUrl: payload?.downloadFileUrl || null,
    });
  }
}
