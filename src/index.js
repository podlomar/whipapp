#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const copy = require('./copy');

const appName = process.argv[2];
const appPath = path.resolve(appName);
const kitName = process.argv[3] || 'plain';
const kitPlanFile = path.resolve(__dirname, `../kits/${kitName}.json`);

if (!fs.existsSync(kitPlanFile)) {
  console.error(`Error: No such kit: ${kitName}`);
  process.exit(1);
}

const kitPlan = JSON.parse(fs.readFileSync(kitPlanFile));

console.log(`Generating ${kitName} app into ${appPath}`);

if (appName !== '.') {
  fs.mkdirSync(appPath);
}

copy(kitPlan, appPath);