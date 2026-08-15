import { NextResponse } from 'next/server';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL || 'http://127.0.0.1:8085';

type CareAssessmentPayload = {
  name?: string;
  countryCode?: string;
  phone?: string;
  phoneFull?: string;
  city?: string;
  serviceStartDate?: string;
  packageName?: string;
  enquiryFor?: string;
  sourcePath?: string;
  submittedAt?: string;
};

const requiredFields: Array<keyof CareAssessmentPayload> = ['name', 'phone', 'city', 'enquiryFor'];

function normalizePayload(payload: CareAssessmentPayload) {
  const countryCode = String(payload.countryCode ?? '').trim();
  const phone = String(payload.phone ?? '').trim();

  return {
    name: String(payload.name ?? '').trim(),
    countryCode,
    phone,
    phoneFull: String(payload.phoneFull ?? `${countryCode} ${phone}`).trim(),
    city: String(payload.city ?? '').trim(),
    serviceStartDate: String(payload.serviceStartDate ?? '').trim(),
    packageName: String(payload.packageName ?? '').trim(),
    enquiryFor: String(payload.enquiryFor ?? '').trim(),
    sourcePath: String(payload.sourcePath ?? '').trim(),
    submittedAt: String(payload.submittedAt ?? new Date().toISOString()).trim(),
  };
}

export async function POST(request: Request) {
  try {
    const payload = normalizePayload(await request.json());
    const missingFields = requiredFields.filter((field) => !payload[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { ok: false, message: 'Missing required fields', missingFields },
        { status: 400 },
      );
    }

    const backendUrl = `${BACKEND_API_BASE_URL}/api/care-assessment`;
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const resData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { ok: false, message: resData.message || 'Unable to process care assessment enquiry' },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(resData);
  } catch (error) {
    console.error('Care assessment proxy error:', error);
    return NextResponse.json(
      { ok: false, message: 'Invalid enquiry payload or backend unreachable' },
      { status: 500 },
    );
  }
}
