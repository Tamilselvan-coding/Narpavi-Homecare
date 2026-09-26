const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const app = path.join(root, 'src/app');
const output = path.join(root, 'src/lib/generated/site-search.json');
const excludedRoutes = new Set(['admin', 'api', 'sales', 'cart', 'search']);
const textKeys = /^(title|name|label|heading|highlight|kicker|copy|description|desc|excerpt|tagline|summary|intro|text|question|answer|detail|category|responsibility|qualification|experience|definition|costCue|note|metaDescription|ctaTitle|ctaText|serviceLabel)$/i;
const technicalKeys = /^(id|slug|href|url|fileUrl|image|imageAlt|alt|icon|color|gradient|accent|accentRgb|accentSoft|className|style|type|date|readTime|canonical)$/i;

function clean(text) {
  return text.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
}

function resolveImport(from, specifier) {
  const base = specifier.startsWith('@/') ? path.join(root, 'src', specifier.slice(2))
    : specifier.startsWith('.') ? path.resolve(path.dirname(from), specifier) : null;
  if (!base) return null;
  const file = [base + '.tsx', base + '.ts', base].find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!file) return null;
  const relative = path.relative(root, file).replaceAll('\\', '/');
  // Follow public copy, not application infrastructure or private workspaces.
  return /src\/components\/sections\//.test(relative)
    || /src\/lib\/(?:\w*(?:Data|Blogs)|blogs|packages|equipment|faqs|deliverables|whoWeCareFor)\.ts$/.test(relative)
    || (/^src\/app\/.+\/page\.tsx$/.test(relative) && !/\/(admin|api|sales)\//.test(relative)) ? file : null;
}

function readContent(file, seen = new Set()) {
  if (seen.has(file)) return { texts: [], title: '', description: '' };
  seen.add(file);
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const texts = [];
  let title = '', description = '';

  function visit(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const dependency = resolveImport(file, node.moduleSpecifier.text);
        if (dependency) {
          const imported = readContent(dependency, seen);
          texts.push(...imported.texts);
          // Public alias pages, such as /baby-care, re-export their page metadata.
          if (ts.isExportDeclaration(node) || dependency.endsWith(`${path.sep}page.tsx`)) {
            title ||= imported.title;
            description ||= imported.description;
          }
        }
      }
      return;
    }
    if (ts.isJsxAttribute(node)) return;
    if (ts.isPropertyAssignment(node) && technicalKeys.test(node.name.getText(source))) return;
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === 'metadata' && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        if (!ts.isPropertyAssignment(property) || !ts.isStringLiteral(property.initializer)) continue;
        if (property.name.getText(source) === 'title') title = property.initializer.text;
        if (property.name.getText(source) === 'description') description = property.initializer.text;
      }
    }
    if (ts.isJsxText(node)) texts.push(clean(node.text));
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const parent = node.parent;
      const isCopy = ts.isArrayLiteralExpression(parent) || ts.isJsxExpression(parent)
        || (ts.isPropertyAssignment(parent) && parent.initializer === node && textKeys.test(parent.name.getText(source)))
        || (ts.isVariableDeclaration(parent) && !/(IMAGE|URL|HREF|PATH)$/i.test(parent.name.getText(source)));
      if (isCopy && /[a-z]/i.test(node.text) && !/^(?:\/|https?:|#|linear-gradient|radial-gradient)/.test(node.text)) texts.push(clean(node.text));
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return { texts: [...new Set(texts.filter(Boolean))], title, description };
}

function pages(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) {
      if (excludedRoutes.has(entry.name) || entry.name.startsWith('[')) return [];
      return pages(path.join(directory, entry.name));
    }
    return entry.name === 'page.tsx' ? [path.join(directory, entry.name)] : [];
  });
}

const documents = pages(app).map(file => {
  const route = '/' + path.relative(app, path.dirname(file)).replaceAll('\\', '/');
  const content = readContent(file);
  const fallback = route === '/' ? 'Narpavi Homecare' : route.split('/').pop().replaceAll('-', ' ');
  return {
    title: content.title || fallback,
    excerpt: content.description || content.texts.find(text => text.length > 60) || fallback,
    href: route === '/home-nursing-care/baby-care' ? '/baby-care' : route,
    type: route.startsWith('/blog/') || route.startsWith('/resources/') ? 'Guide' : 'Page',
    keywords: content.texts.join(' '),
  };
}).sort((a, b) => a.href.localeCompare(b.href));

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(documents, null, 2) + '\n');
console.log(`Indexed public content from ${documents.length} pages.`);
