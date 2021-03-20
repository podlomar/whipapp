#!/usr/bin/env node

'use strict';

const path = require('path');
const {fetchKitPlan, initAppFolder, generateApp } = require('whipapp-core');

const appName = process.argv[2];
const rootDir = path.resolve('.');
const kitName = process.argv[3];

(async () => {
  const kitPlan = await fetchKitPlan(kitName);
  const { appRoot } = initAppFolder(rootDir, appName);
  await generateApp(appRoot, kitPlan);
})();