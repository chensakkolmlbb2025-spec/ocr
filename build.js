#!/usr/bin/env node
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const root = path.resolve(__dirname);
const publicDir = path.join(root, 'public');

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function removeDir(dir) {
  try {
    await fsp.rm(dir, { recursive: true, force: true });
  } catch (err) {
    // ignore
  }
}

async function copyIfExists(src, dest) {
  try {
    const stat = await fsp.stat(src);
    if (stat.isDirectory()) {
      // Node 16+ supports recursive copy
      await fsp.cp(src, dest, { recursive: true });
    } else {
      await ensureDir(path.dirname(dest));
      await fsp.copyFile(src, dest);
    }
    console.log(`Copied ${src} -> ${dest}`);
  } catch (err) {
    // not fatal — file/folder may not exist
    if (err.code !== 'ENOENT') console.warn(`Warning copying ${src}:`, err.message);
    else console.log(`Skipped missing: ${src}`);
  }
}

async function main() {
  try {
    await removeDir(publicDir);
    await ensureDir(publicDir);

    // Copy core files
    await copyIfExists(path.join(root, 'index.html'), path.join(publicDir, 'index.html'));
    await copyIfExists(path.join(root, 'style.css'), path.join(publicDir, 'style.css'));
    await copyIfExists(path.join(root, 'script.js'), path.join(publicDir, 'script.js'));

    // Copy assets directory if present
    await copyIfExists(path.join(root, 'assets'), path.join(publicDir, 'assets'));

    // Copy open-graph or social images if present
    await copyIfExists(path.join(root, 'og-image.jpg'), path.join(publicDir, 'og-image.jpg'));
    await copyIfExists(path.join(root, 'twitter-image.jpg'), path.join(publicDir, 'twitter-image.jpg'));

    console.log('Build completed — public/ is ready.');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

main();
