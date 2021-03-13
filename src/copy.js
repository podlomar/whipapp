const fs = require('fs');
const path = require('path');
const walkSync = require('walkdir').sync;

function stripLeadingUnderscore(file) {
  const fileName = path.basename(file);
  const fileParent = path.dirname(file);
  const destFileName = fileName.startsWith('_') ? fileName.slice(1) : fileName;

  return path.join(fileParent, destFileName);
}

function walkCopy(src, destDir) {
  const stats = fs.statSync(src);
  const srcDir = stats.isDirectory() ? src : path.dirname(src);
  
  return walkSync(src, (srcPath, stat) => {
    const strippedPath = stripLeadingUnderscore(srcPath);
    const destPath = path.resolve(
      destDir, path.relative(srcDir, strippedPath),
    );

    if (stat.isDirectory()) {
      fs.mkdirSync(destPath);
      return;
    }

    const destParent = path.dirname(destPath);
    fs.mkdirSync(destParent, { recursive: true });
    fs.copyFileSync(srcPath, destPath);
  });
}

module.exports = function copy(plan, appPath) {
  plan.forEach(({ from, to }) => walkCopy(
    path.resolve(__dirname, `../${from}`), 
    path.resolve(appPath, to),
  ));
}