const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const before = content.length;

// Remove lang-btn button from JSON-encoded template
// The button appears as escaped HTML inside a JSON string
const btnPattern = /\\u003cbutton class=\\"lang-btn\\"[^\\]*\\u003cspan[^\\]*\\u003c\/span\\u003e\\u003c\/button\\u003e|<button class=\\"lang-btn\\" onclick=\\"toast[^>]*>KR [^<]*<\/svg><\/button>/g;
content = content.replace(btnPattern, '');

// Try a simpler search - look for the exact encoded string
const searchStr = 'lang-btn';
const count = (content.match(/lang-btn/g) || []).length;
console.log('lang-btn occurrences:', count);
console.log('Chars removed:', before - content.length);

// Let's find the context around lang-btn
const idx = content.indexOf('lang-btn');
if (idx > -1) {
  console.log('Context:', JSON.stringify(content.substring(idx-50, idx+300)));
}
