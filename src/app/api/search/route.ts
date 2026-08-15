import { NextResponse } from 'next/server';
import { getSearchResults } from '@/lib/search';

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL || 'http://localhost:8085';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const limitStr = searchParams.get('limit') || '12';
  const limit = parseInt(limitStr, 10) || 12;

  try {
    const backendUrl = `${BACKEND_API_BASE_URL}/api/search?q=${encodeURIComponent(q)}&limit=${limit}`;
    const backendResponse = await fetch(backendUrl);

    if (backendResponse.ok) {
      const resData = await backendResponse.json();
      return NextResponse.json(resData);
    }
  } catch (error) {
    console.warn('Backend search unreachable, using fallback search:', error);
  }

  // Fallback to local search logic if backend search index is not yet seeded or unreachable
  const results = getSearchResults(q, limit);
  return NextResponse.json({
    ok: true,
    query: q,
    count: results.length,
    results: results.map(r => ({
      title: r.title,
      excerpt: r.excerpt,
      href: r.href,
      type: r.type
    }))
  });
}
