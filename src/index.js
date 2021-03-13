#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const walkSync = require('walkdir').sync;

function copyDir(dir, dest) {
  return walkSync(dir, (srcPath, stat) => {
    const srcFileName = path.basename(srcPath);
    const destFileName =
      srcFileName === '_.gitignore' ? '.gitignore' : srcFileName;

    const srcFileParent = path.dirname(srcPath);

    const destPath = path.resolve(
      dest,
      path.relative(dir, srcFileParent),
      destFileName,
    );

    if (stat.isDirectory()) {
      fs.mkdirSync(destPath);
      return;
    }

    fs.copyFileSync(srcPath, destPath);
  });
}

const appName = process.argv[2];
const appPath = path.resolve(appName);
const kitName = process.argv[3] || 'plain';
const kitPath = path.resolve(__dirname, `../kits/${kitName}`);

if (!fs.existsSync(kitPath)) {
  console.error(`Error: No such kit: ${kitName}`);
  process.exit(1);
}

console.log(`Generating ${kitName} app into ${appPath}`);

if (appName !== '.') {
  fs.mkdirSync(appPath);
}

copyDir(kitPath, appPath);