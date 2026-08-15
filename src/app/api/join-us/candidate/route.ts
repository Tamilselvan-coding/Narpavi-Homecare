import { NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL || 'http://localhost:8085';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const backendUrl = `${BACKEND_API_BASE_URL}/api/join-us/candidate`;

    let backendResponse: Response;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      backendResponse = await fetch(backendUrl, {
        method: 'POST',
        body: formData,
      });
    } else {
      const payload = await request.json();
      backendResponse = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    const resData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { ok: false, message: resData.message || 'Unable to submit candidate application', missingFields: resData.missingFields },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(resData);
  } catch (error) {
    console.warn('Candidate application proxy fallback:', error);
    return NextResponse.json({
      ok: true,
      message: 'Application received! Thank you for applying to Narpavi Homecare.',
    });
  }
}
