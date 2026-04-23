const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });
  return arrayOfFiles;
}

const assetsDir = path.join(process.cwd(), 'public', 'assets');
const assetFiles = getAllFiles(assetsDir);

const srcDirs = [
  path.join(process.cwd(), 'app'),
  path.join(process.cwd(), 'components'),
  path.join(process.cwd(), 'lib')
];

let allJsFiles = [];
srcDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    allJsFiles = allJsFiles.concat(getAllFiles(dir).filter(f => f.endsWith('.js') || f.endsWith('.jsx')));
  }
});

let allCode = '';
allJsFiles.forEach(f => {
  allCode += fs.readFileSync(f, 'utf8') + '\n';
});

let unusedFiles = [];
assetFiles.forEach(f => {
  const basename = path.basename(f);
  if (basename.endsWith('.js')) return; 
  if (basename === '.gitkeep') return;

  if (!allCode.includes(basename)) {
    unusedFiles.push(f);
  }
});

console.log('Total asset files:', assetFiles.length);
console.log('Unused asset files:', unusedFiles.length);

unusedFiles.forEach(f => {
  try {
     const relPath = path.relative(process.cwd(), f).replace(/\\/g, '/');
     console.log('Removing from git tracking: ' + relPath);
     execSync(`git rm --cached "${relPath}"`, { stdio: 'ignore' });
  } catch (e) {
     // Might fail if not tracked by git, ignore
  }
});
console.log('Done!');
