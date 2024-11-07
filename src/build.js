const path = require('path');
const fs = require('fs');

require('esbuild').build({
    entryPoints: ['./src/index.js'], // 确保这里路径是正确的
    bundle: true,
    minify: true,
    outfile: path.join(__dirname, '/../dist', 'xyb.js'), // 使用绝对路径
    platform: 'node',
}).then(() => {
    console.log('Build successful');
}).catch((error) => {
    console.error('Build failed:', error);
});
