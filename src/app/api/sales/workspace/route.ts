import { NextResponse } from 'next/server';
const base = process.env.BACKEND_API_BASE_URL || 'http://127.0.0.1:8085';

export async function GET(request: Request) {
  const url = new URL(request.url);
  try {
    const response = await fetch(`${base}/api/sales/workspace?${url.searchParams}`, { cache: 'no-store' });
    return NextResponse.json(await response.json(), { status: response.status });
  } catch { return NextResponse.json({ message: 'Sales server is unavailable' }, { status: 503 }); }
}
