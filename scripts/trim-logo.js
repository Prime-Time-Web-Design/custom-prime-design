#!/usr/bin/env node

// Script to trim transparent padding from the logo
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import sharp the same way as optimize-images.js
let sharp;
try {
  sharp = await import('sharp');
  sharp = sharp.default; // Get the default export
} catch (e) {
  console.error('Error importing sharp:', e);
  process.exit(1);
}

// Paths
const publicDir = path.join(__dirname, '../public');
const optimizedDir = path.join(publicDir, 'optimized');
const logoPath = path.join(optimizedDir, 'primeLogo.webp');
const outputPath = path.join(optimizedDir, 'primeLogo-trimmed.webp');

// Ensure optimized directory exists
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
  console.log('Created optimized directory');
}

async function trimLogo() {
  // Get trim threshold from command line args (default: 10)
  const threshold = process.argv[2] ? parseInt(process.argv[2]) : 10;
  
  try {
    console.log(`Trimming transparent padding from ${logoPath} with threshold ${threshold}...`);
    
    // Check if logo file exists
    if (!fs.existsSync(logoPath)) {
      console.error(`Logo file not found at ${logoPath}`);
      return;
    }
    
    // Get original dimensions
    const metadata = await sharp(logoPath).metadata();
    console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);
    
    // Trim transparent padding and save the result
    await sharp(logoPath)
      .trim({
        threshold: threshold  // 0-255, lower values make the trim more aggressive
      }) // This removes transparent pixels from all edges
      .toFile(outputPath);
    
    // Get new dimensions
    const newMetadata = await sharp(outputPath).metadata();
    console.log(`New dimensions: ${newMetadata.width}x${newMetadata.height}`);
    console.log(`✅ Logo trimmed and saved to ${outputPath}`);
    
    // Check if we should replace the original
    const replaceOriginal = process.argv.includes('--replace');
    if (replaceOriginal) {
      fs.copyFileSync(outputPath, logoPath);
      console.log(`✅ Original logo replaced with trimmed version`);
    }
    
  } catch (error) {
    console.error('Error trimming logo:', error);
  }
}

// Run the function
trimLogo();