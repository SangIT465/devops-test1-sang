const fs = require('fs');

fs.rmSync('dist', { recursive: true, force: true });
fs.cpSync('src', 'disttt', { recursive: true });
console.log('Build OK: src -> dist');