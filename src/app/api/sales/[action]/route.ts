import { NextResponse } from 'next/server';
const base = process.env.BACKEND_API_BASE_URL || 'http://127.0.0.1:8085';

export async function POST(request: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  if (!['assign', 'claim', 'update'].includes(action)) return NextResponse.json({ message: 'Unknown action' }, { status: 404 });
  try {
    const response = await fetch(`${base}/api/sales/${action}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: await request.text() });
    return NextResponse.json(await response.json(), { status: response.status });
  } catch { return NextResponse.json({ message: 'Sales server is unavailable' }, { status: 503 }); }
}
