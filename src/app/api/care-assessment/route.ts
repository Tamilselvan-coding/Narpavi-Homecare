import { NextResponse } from 'next/server';

type CareAssessmentPayload = {
  name?: string;
  countryCode?: string;
  phone?: string;
  phoneFull?: string;
  city?: string;
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

    const upstreamUrl = process.env.CARE_ASSESSMENT_API_URL;

    if (upstreamUrl) {
      const upstreamResponse = await fetch(upstreamUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!upstreamResponse.ok) {
        return NextResponse.json(
          { ok: false, message: 'Unable to forward enquiry' },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      enquiryFor: payload.enquiryFor,
      forwarded: Boolean(upstreamUrl),
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid enquiry payload' },
      { status: 400 },
    );
  }
}
