#!/usr/bin/env node

// Simple image optimization script for Next.js projects
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if sharp is installed
let sharp;
try {
  sharp = await import('sharp');
  sharp = sharp.default; // Get the default export
} catch (e) {
  console.log('Installing sharp...');
  execSync('npm install --save-dev sharp');
  const sharpModule = await import('sharp');
  sharp = sharpModule.default;
}

// Paths
const publicDir = path.join(__dirname, '../public');
const optimizedDir = path.join(publicDir, 'optimized');

// Settings for image optimization
const imageSettings = {
  jpeg: { quality: 75, progressive: true },
  jpg: { quality: 75, progressive: true },
  png: { quality: 75, compressionLevel: 9 },
  webp: { quality: 75 }
};

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
  console.log('Created optimized directory');
}

// Handle SVG files (just copy them for now)
function handleSvg(filePath) {
  const fileName = path.basename(filePath);
  const outputPath = path.join(optimizedDir, fileName);
  
  fs.copyFileSync(filePath, outputPath);
  console.log(`Copied SVG: ${fileName}`);
}

// Process image with sharp
async function processImage(filePath) {
  try {
    const fileName = path.basename(filePath);
    const ext = path.extname(filePath).toLowerCase().replace('.', '');
    const nameWithoutExt = path.basename(filePath, path.extname(filePath));
    const outputPath = path.join(optimizedDir, fileName);
    
    // Get original file size
    const originalStats = fs.statSync(filePath);
    const originalSizeInMB = (originalStats.size / (1024 * 1024)).toFixed(2);
    
    // Process image based on type
    if (ext === 'jpg' || ext === 'jpeg') {
      await sharp(filePath)
        .jpeg(imageSettings.jpeg)
        .toFile(outputPath);
    } else if (ext === 'png') {
      await sharp(filePath)
        .png(imageSettings.png)
        .toFile(outputPath);
    } else {
      // For other formats, just copy
      fs.copyFileSync(filePath, outputPath);
      console.log(`Copied ${fileName} (unsupported format for optimization)`);
      return;
    }
    
    // Create WebP version with higher quality for hero images
    const webpQuality = nameWithoutExt === 'hero' ? 90 : imageSettings.webp.quality;
    const webpOutputPath = path.join(optimizedDir, `${nameWithoutExt}.webp`);
    await sharp(filePath)
      .webp({ quality: webpQuality })
      .toFile(webpOutputPath);
    
    // Generate tiny placeholder for blur effect (10px wide, base64 encoded)
    if (nameWithoutExt === 'hero') {
      const placeholderBuffer = await sharp(filePath)
        .resize(10) // Tiny size for placeholder
        .webp({ quality: 20 })
        .toBuffer();
      
      // Log placeholder as base64 for easy copy-paste to code
      const placeholderBase64 = `data:image/webp;base64,${placeholderBuffer.toString('base64')}`;
      console.log(`\nBlur placeholder for ${fileName}:`);
      console.log(placeholderBase64);
      console.log('\nYou can use this as a blurDataURL in Next.js Image component\n');
    }
    
    // Log results
    const newStats = fs.statSync(outputPath);
    const newSizeInMB = (newStats.size / (1024 * 1024)).toFixed(2);
    const webpStats = fs.statSync(webpOutputPath);
    const webpSizeInMB = (webpStats.size / (1024 * 1024)).toFixed(2);
    
    const originalReduction = Math.round((1 - (newStats.size / originalStats.size)) * 100);
    const webpReduction = Math.round((1 - (webpStats.size / originalStats.size)) * 100);
    
    console.log(`Optimized ${fileName}:`);
    console.log(`  - Original: ${originalSizeInMB}MB`);
    console.log(`  - Optimized: ${newSizeInMB}MB (${originalReduction}% reduction)`);
    console.log(`  - WebP: ${webpSizeInMB}MB (${webpReduction}% reduction)`);
  } catch (error) {
    console.error(`Error processing ${path.basename(filePath)}:`, error.message);
  }
}

// Process all images in directory
async function processAllImages() {
  try {
    console.log('Starting image optimization...');
    const files = fs.readdirSync(publicDir);
    
    // Filter files to process (only process images, skip directories and hidden files)
    const filesToProcess = files.filter(file => {
      const filePath = path.join(publicDir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();
      const isHidden = file.startsWith('.');
      const isOptimizedDir = file === 'optimized';
      
      return !isDirectory && !isHidden && !isOptimizedDir;
    });
    
    // Process each file
    for (const file of filesToProcess) {
      const filePath = path.join(publicDir, file);
      const ext = path.extname(file).toLowerCase();
      
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        await processImage(filePath);
      } else if (ext === '.svg') {
        handleSvg(filePath);
      }
    }
    
    console.log('✅ Image optimization complete!');
  } catch (error) {
    console.error('Error during optimization process:', error.message);
  }
}

// Run the optimization
processAllImages();