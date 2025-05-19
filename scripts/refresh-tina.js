#!/usr/bin/env node

import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Files and directories to clean
const pathsToClean = [
  path.join(rootDir, '.next'),
  path.join(rootDir, 'tina/__generated__'),
  path.join(rootDir, 'tina-lock.json')
];

console.log('🧹 Cleaning stale generated files...');

// Delete directories/files if they exist
for (const p of pathsToClean) {
  try {
    if (fs.existsSync(p)) {
      if (fs.lstatSync(p).isDirectory()) {
        fs.rmSync(p, { recursive: true, force: true });
        console.log(`✅ Removed directory: ${p}`);
      } else {
        fs.unlinkSync(p);
        console.log(`✅ Removed file: ${p}`);
      }
    }
  } catch (err) {
    console.error(`❌ Error cleaning ${p}:`, err);
  }
}

console.log('🔄 Regenerating Tina CMS types...');

// Run tinacms init to regenerate types
exec('npx tinacms init', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error regenerating Tina types:', error);
    return;
  }
  
  if (stderr) {
    console.error('⚠️ Warnings during regeneration:', stderr);
  }
  
  console.log('✅ Tina types regenerated successfully');
  console.log(stdout);
  
  console.log('\n🚀 Your Tina CMS setup has been refreshed. You can now start the development server with:');
  console.log('npm run dev');
});
