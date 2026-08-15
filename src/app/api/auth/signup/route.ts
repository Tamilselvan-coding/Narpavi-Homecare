import { NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL || 'http://127.0.0.1:8085';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const backendUrl = `${BACKEND_API_BASE_URL}/api/auth/signup`;

    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Backend connection failed or offline. ' + (error.message || '') },
      { status: 500 }
    );
  }
}
