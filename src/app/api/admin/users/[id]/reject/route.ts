import { NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL || 'http://127.0.0.1:8085';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const backendUrl = `${BACKEND_API_BASE_URL}/api/admin/users/${id}/reject`;

    const backendResponse = await fetch(backendUrl, {
      method: 'PUT',
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Backend rejection request failed. ' + (error.message || '') },
      { status: 500 }
    );
  }
}
