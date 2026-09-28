const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function setup(href = '#hnc-cta', options = {}) {
  const calls = [];
  const target = {
    style: {},
    scrollIntoView: (value) => calls.push(value),
    querySelector: () => null,
    closest: () => null,
  };
  const anchor = { href, target: options.target || '', hasAttribute: () => !!options.download };
  class Element { closest() { return anchor; } }
  const window = {
    location: { href: 'https://example.com/home-nursing-care' },
    matchMedia: () => ({ matches: !!options.reducedMotion }),
    history: { pushState: (_, __, url) => { window.location.href = url; history.push(url); } },
    setTimeout: (fn) => { fn(); return 0; },
    clearTimeout: () => {},
  };
  const history = [];
  const document = {
    getElementById: (id) => id === 'site-header'
      ? { getBoundingClientRect: () => ({ height: 128 }) }
      : id === 'hnc-cta' ? target : null,
    querySelector: () => null,
  };
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/lib/anchorNavigation.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(code, { exports, window, document, Element, URL });
  const click = (extra = {}) => {
    const event = { target: new Element(), button: 0, defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; }, ...extra };
    exports.handleAnchorClick(event);
    return event;
  };
  return { click, calls, history, target };
}

test('first and repeated CTA clicks scroll even when the hash has not changed', () => {
  const s = setup();
  for (let i = 0; i < 3; i++) assert.equal(s.click().defaultPrevented, true);
  assert.equal(s.calls.length, 3);
  assert.equal(s.history.length, 1);
  assert.equal(s.target.style.scrollMarginTop, '144px');
  assert.equal(s.calls[0].block, 'start');
});

test('preserves modified clicks, new tabs, downloads and handled events', () => {
  for (const extra of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { defaultPrevented: true }]) {
    const s = setup(); s.click(extra); assert.equal(s.calls.length, 0);
  }
  for (const options of [{ target: '_blank' }, { download: true }]) {
    const s = setup('#hnc-cta', options); s.click(); assert.equal(s.calls.length, 0);
  }
});

test('leaves other routes, queries, external links and missing targets to navigation', () => {
  for (const href of ['/contact#hnc-cta', '?location=Chennai#hnc-cta', 'https://other.com/#hnc-cta', '#missing', '#%invalid', 'mailto:services@narpavihomecare.com']) {
    const s = setup(href); assert.equal(s.click().defaultPrevented, false); assert.equal(s.calls.length, 0);
  }
});

test('respects reduced motion', () => {
  const s = setup('#hnc-cta', { reducedMotion: true }); s.click();
  assert.equal(s.calls[0].behavior, 'instant');
});

test('blog assessment links point to real form sections', () => {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/lib/careFormLinks.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(code, { exports });
  for (const route of ['/baby-care', '/basic-nursing-care', '/home-nursing-care',
    '/home-nursing-care/advance-nursing-care', '/home-nursing-care/specialty-nursing-care',
    '/home-nursing-care/icu-at-home', '/home-nursing-care/end-of-life-care', '/elder-care']) {
    const href = exports.getCareFormHref(route);
    const [targetRoute, id] = href.split('#');
    const pageRoute = targetRoute === '/baby-care' ? '/home-nursing-care/baby-care' : targetRoute;
    const page = fs.readFileSync(path.join(__dirname, '../src/app', pageRoute, 'page.tsx'), 'utf8');
    assert.ok(page.includes(`id="${id}"`), `${href} must have a matching form section`);
  }
  assert.equal(exports.getCareFormHref('/unknown'), '/contact#assessment-form');
});
