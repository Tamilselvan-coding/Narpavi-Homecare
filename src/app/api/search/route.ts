import { NextResponse } from 'next/server';
import { getSearchResults } from '@/lib/search';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim().slice(0, 160);
  const limit = Number(searchParams.get('limit') || 12);
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
