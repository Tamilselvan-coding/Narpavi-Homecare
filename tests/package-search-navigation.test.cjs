const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Helper to transpile and load TS file
function loadModule(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;

  const m = { exports: {} };
  const customRequire = (specifier) => {
    if (specifier.startsWith('@/lib/')) {
      const target = path.join(__dirname, '../src/lib', specifier.slice(6));
      const resolved = [target, target + '.ts', target + '.json', target + '.js'].find(f => fs.existsSync(f) && fs.statSync(f).isFile());
      if (resolved) {
        if (resolved.endsWith('.json')) return JSON.parse(fs.readFileSync(resolved, 'utf8'));
        return loadModule(resolved);
      }
    }
    return require(specifier);
  };

  const fn = new Function('require', 'module', 'exports', transpiled);
  fn(customRequire, m, m.exports);
  return m.exports;
}

test('search returns package section anchors for Nanny Angel Care', () => {
  const { getSearchResults } = loadModule(path.join(__dirname, '../src/lib/search.ts'));

  const results = getSearchResults('Nanny Angel Care');
  assert.ok(results.length > 0, 'Should find Nanny Angel Care');
  const nannyResult = results.find(r => r.title === 'Nanny Angel Care');
  assert.ok(nannyResult, 'Nanny Angel Care should be in results');
  assert.equal(nannyResult.href, '/baby-care#package-nanny-angel-care');
  assert.equal(nannyResult.type, 'Care Package');
});

test('search handles typo "nany anges care" and matches Nanny Angel Care', () => {
  const { getSearchResults } = loadModule(path.join(__dirname, '../src/lib/search.ts'));

  const results = getSearchResults('nany anges care');
  assert.ok(results.length > 0, 'Should find results for typo "nany anges care"');
  const nannyResult = results.find(r => r.title === 'Nanny Angel Care');
  assert.ok(nannyResult, 'Nanny Angel Care should be found with typo "nany anges care"');
  assert.equal(nannyResult.href, '/baby-care#package-nanny-angel-care');
});

test('search handles plural "nanny angels" and matches Nanny Angel Care', () => {
  const { getSearchResults } = loadModule(path.join(__dirname, '../src/lib/search.ts'));

  const results = getSearchResults('nanny angels');
  assert.ok(results.length > 0, 'Should find results for "nanny angels"');
  const nannyResult = results.find(r => r.title === 'Nanny Angel Care');
  assert.ok(nannyResult, 'Nanny Angel Care should be found for "nanny angels"');
  assert.equal(nannyResult.href, '/baby-care#package-nanny-angel-care');
});

test('all care packages have section anchors pointing to main service pages', () => {
  const { SEARCH_RESULTS } = loadModule(path.join(__dirname, '../src/lib/search.ts'));

  const packageResults = SEARCH_RESULTS.filter(r => r.type === 'Care Package');
  assert.ok(packageResults.length >= 15, `Expected >= 15 packages, found ${packageResults.length}`);

  for (const pkg of packageResults) {
    assert.ok(pkg.href.includes('#package-'), `Package "${pkg.title}" href "${pkg.href}" must include #package- anchor`);
    assert.ok(
      pkg.href.startsWith('/baby-care#') ||
      pkg.href.startsWith('/elder-care#') ||
      pkg.href.startsWith('/basic-nursing-care#') ||
      pkg.href.startsWith('/home-nursing-care/advance-nursing-care#') ||
      pkg.href.startsWith('/home-nursing-care/specialty-nursing-care#') ||
      pkg.href.startsWith('/home-nursing-care/icu-at-home#'),
      `Package "${pkg.title}" href "${pkg.href}" must point to a main service page anchor`
    );
  }
});
