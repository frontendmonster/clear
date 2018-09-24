const fs = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');
const pkg = require('../package.json');

Reflect.deleteProperty(pkg, 'private');

const src = path.join(__dirname, '..');
const lib = path.join(src, 'lib');

const files = [
  'LICENSE',
  'README.md',
];

spawnSync('npm', ['run', 'build'], { cwd: src });

files.map(file => fs.copyFileSync(path.join(src, file), path.join(lib, file)));

fs.writeFileSync(path.join(lib, 'package.json'), JSON.stringify(pkg, {}, 2));

spawn('npm', ['publish'], { cwd: lib });
