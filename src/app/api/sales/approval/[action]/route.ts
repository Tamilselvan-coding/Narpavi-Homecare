import { NextResponse } from 'next/server';

const base = process.env.BACKEND_API_BASE_URL || 'http://127.0.0.1:8085';

const paths: Record<string, (id: string) => string> = {
  configure: (id) => `/api/admin/users/${id}/configure`,
  finalApprove: (id) => `/api/admin/users/${id}/approve`,
  reject: (id) => `/api/admin/users/${id}/reject`,
  tlApprove: (id) => `/api/admin/users/${id}/tl-approve`,
  tlReject: (id) => `/api/admin/users/${id}/tl-reject`,
};

export async function PUT(request: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  const id = new URL(request.url).searchParams.get('id');
  if (!id || !paths[action]) return NextResponse.json({ message: 'Unknown approval action' }, { status: 404 });
  try {
    const response = await fetch(`${base}${paths[action](id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: await request.text(),
    });
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json({ message: 'Sales server is unavailable' }, { status: 503 });
  }
}
