const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const files = ['index.html', 'about.html', 'information.html', 'education.html', 'contact.html', 'styles.css', 'portfolio.js'];
const source = new Map(files.map(file => [file, fs.readFileSync(path.join(__dirname, file), 'utf8')]));

// Fail before copying anything if an empty entry point or merge conflict would
// otherwise be published as a successful but broken static site.
const index = source.get('index.html');
if (!index.trim() || !/<main\b/i.test(index) || !/<\/html>/i.test(index)) {
  throw new Error('index.html must contain the complete portfolio before building.');
}
for (const [file, content] of source) {
  if (/^(?:<{7}|={7}|>{7}|\|{7})(?:\s|$)/m.test(content)) {
    throw new Error(`Unresolved merge conflict in ${file}.`);
  }
}
new vm.Script(source.get('portfolio.js'), { filename: 'portfolio.js' });

// Resolve local links from the published domain root, matching GitHub Pages.
// Hash navigation, email links, data icons, and remote fonts need no local file.
for (const [, reference] of index.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (/^(?:#|[a-z][a-z\d+.-]*:|\/\/)/i.test(reference)) continue;
  const url = new URL(reference, 'https://portfolio.example/');
  const assetPath = path.resolve(__dirname, '.' + decodeURIComponent(url.pathname));
  if (!assetPath.startsWith(__dirname + path.sep) || !fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) {
    throw new Error(`Missing or invalid root asset: ${reference}`);
  }
}

const output = path.join(__dirname, 'dist');
fs.mkdirSync(output, { recursive: true });
for (const file of files) {
  fs.copyFileSync(path.join(__dirname, file), path.join(output, file));
}
fs.cpSync(path.join(__dirname, 'assets'), path.join(output, 'assets'), { recursive: true });
console.log('Built portfolio in dist/');
