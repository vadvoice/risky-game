const { readFileSync, writeFileSync } = require('fs');
let txt = readFileSync('./docs/index.html');
txt = txt.toString().replaceAll('/static/', 'static/');
writeFileSync('./docs/index.html', txt);
console.log('\npost build edits complete\n');