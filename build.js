const fs = require('fs');

fs.rmSync('dist', { recursive: true, force: true });
fs.cpSync('src', 'dist', { recursive: true });
console.log('Build OK: src -> dist');