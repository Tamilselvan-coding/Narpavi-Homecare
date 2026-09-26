# Performance audit - 2026-09-26

The supplied Google mobile report scored 77 (FCP 3.2s, LCP 4.0s).

Implemented local fonts, page-specific CSS, on-demand search, prioritized and deferred carousel images, responsive image compression, and a 1 KB favicon replacing the 893 KB logo.

Local mobile Lighthouse score: 54 to 65.

| Metric | Before | After |
| --- | --- | --- |
| First Contentful Paint | 3.9 s | 2.1 s |
| Largest Contentful Paint | 5.5 s | 4.8 s |
| Speed Index | 6.5 s | 3.5 s |
| Total Blocking Time | 490 ms | 600 ms |
| Cumulative Layout Shift | 0.016 | 0 |
| Avoids enormous network payloads | Total size was 1,620 KiB | Total size was 529 KiB |

Individual local runs have different CPU benchmarks and are not equivalent to Google PageSpeed. Main-thread work still limits the score. No 90+ result is claimed.

Production build, five navigation tests, and browser menu, search and full carousel-cycle checks passed. Targeted lint: no errors, three existing unused-import warnings.

Changes are local. Deploy and rerun the public mobile PageSpeed test to verify production results.
