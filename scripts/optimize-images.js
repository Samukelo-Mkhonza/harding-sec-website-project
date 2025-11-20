const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Image Optimization Script
 * Converts images to WebP format and generates multiple sizes
 */

const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Image sizes to generate
const SIZES = [
  { width: 320, suffix: '-sm' },
  { width: 768, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
  { width: 1920, suffix: '-xl' },
];

// Quality settings
const WEBP_QUALITY = 85;
const JPEG_QUALITY = 85;

/**
 * Ensure output directory exists
 */
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Get all image files from directory
 */
function getImageFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Input directory ${dir} does not exist. Creating it...`);
    fs.mkdirSync(dir, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputDir, filename) {
  const nameWithoutExt = path.parse(filename).name;
  const ext = path.extname(filename).toLowerCase();

  console.log(`Processing: ${filename}`);

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Generate WebP versions at different sizes
    for (const size of SIZES) {
      // Skip if original is smaller than target size
      if (metadata.width < size.width) continue;

      const outputFilename = `${nameWithoutExt}${size.suffix}.webp`;
      const outputPath = path.join(outputDir, outputFilename);

      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      console.log(`  ✓ Created ${outputFilename}`);
    }

    // Generate fallback JPEG/PNG versions
    for (const size of SIZES) {
      if (metadata.width < size.width) continue;

      const fallbackExt = ext === '.png' ? '.png' : '.jpg';
      const outputFilename = `${nameWithoutExt}${size.suffix}${fallbackExt}`;
      const outputPath = path.join(outputDir, outputFilename);

      const pipeline = sharp(inputPath).resize(size.width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });

      if (fallbackExt === '.jpg') {
        await pipeline.jpeg({ quality: JPEG_QUALITY }).toFile(outputPath);
      } else {
        await pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
      }

      console.log(`  ✓ Created ${outputFilename} (fallback)`);
    }

    // Generate full-size WebP
    const fullSizeWebP = path.join(outputDir, `${nameWithoutExt}.webp`);
    await sharp(inputPath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(fullSizeWebP);
    console.log(`  ✓ Created ${nameWithoutExt}.webp (full size)`);

  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error.message);
  }
}

/**
 * Main optimization function
 */
async function optimizeAllImages() {
  console.log('🖼️  Image Optimization Pipeline\n');
  console.log(`Input directory: ${INPUT_DIR}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  // Ensure directories exist
  ensureDirectoryExists(INPUT_DIR);
  ensureDirectoryExists(OUTPUT_DIR);

  // Get all images
  const imageFiles = getImageFiles(INPUT_DIR);

  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    console.log('Place your images in the public/images directory and run this script again.');
    return;
  }

  console.log(`Found ${imageFiles.length} images to optimize\n`);

  // Process each image
  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    await optimizeImage(inputPath, OUTPUT_DIR, file);
    console.log('');
  }

  console.log('✅ Image optimization complete!');
  console.log(`\nOptimized images saved to: ${OUTPUT_DIR}`);
}

// Run the optimization
optimizeAllImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
