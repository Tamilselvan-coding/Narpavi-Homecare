import { NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL || 'http://127.0.0.1:8085';

export async function GET() {
  try {
    const backendUrl = `${BACKEND_API_BASE_URL}/api/admin/leads`;
    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (backendResponse.ok) {
      const resData = await backendResponse.json();
      return NextResponse.json(resData);
    }

    return NextResponse.json(
      { ok: false, message: 'Failed to fetch admin leads from backend server' },
      { status: backendResponse.status },
    );
  } catch (error) {
    console.warn('Admin leads proxy notice:', error);
    return NextResponse.json({
      ok: false,
      message: 'Backend server unreachable',
      careAssessments: [],
      downloadLeads: [],
      partnerEnquiries: [],
      candidateApplications: [],
    });
  }
}
