const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Base SVG icon for our design tools directory
const baseSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="96" fill="#6366f1"/>
  <g transform="translate(80, 80)">
    <!-- Design tools icon -->
    <rect x="32" y="32" width="288" height="288" rx="32" fill="white" fill-opacity="0.1"/>
    <rect x="64" y="64" width="224" height="224" rx="16" fill="white" fill-opacity="0.9"/>
    
    <!-- Grid pattern -->
    <g stroke="#6366f1" stroke-width="2" fill="none">
      <path d="M96 128 L96 256 M128 128 L128 256 M160 128 L160 256 M192 128 L192 256 M224 128 L224 256 M256 128 L256 256"/>
      <path d="M96 128 L256 128 M96 160 L256 160 M96 192 L256 192 M96 224 L256 224 M96 256 L256 256"/>
    </g>
    
    <!-- Tools -->
    <circle cx="112" cy="144" r="8" fill="#6366f1"/>
    <rect x="136" y="136" width="16" height="16" rx="2" fill="#8b5cf6"/>
    <polygon points="176,136 192,144 184,160 168,152" fill="#ec4899"/>
    <rect x="208" y="136" width="16" height="16" rx="8" fill="#10b981"/>
    
    <rect x="104" y="176" width="24" height="8" rx="4" fill="#f59e0b"/>
    <circle cx="152" cy="180" r="6" fill="#ef4444"/>
    <polygon points="176,176 184,168 192,176 184,184" fill="#06b6d4"/>
    <rect x="208" y="176" width="16" height="8" rx="4" fill="#84cc16"/>
    
    <rect x="104" y="208" width="16" height="16" rx="2" fill="#f97316"/>
    <circle cx="144" cy="216" r="8" fill="#3b82f6"/>
    <rect x="168" y="208" width="24" height="16" rx="8" fill="#8b5cf6"/>
    <polygon points="208,208 224,216 216,232 200,224" fill="#14b8a6"/>
    
    <rect x="104" y="240" width="32" height="8" rx="4" fill="#6366f1"/>
    <circle cx="160" cy="244" r="6" fill="#ec4899"/>
    <rect x="184" y="240" width="16" height="8" rx="4" fill="#10b981"/>
    <rect x="216" y="240" width="8" height="8" rx="4" fill="#f59e0b"/>
  </g>
</svg>
`;

// Write base SVG
fs.writeFileSync(path.join(publicDir, 'icon.svg'), baseSvg);

// Function to generate icons
async function generateIcons() {
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 72, name: 'icon-72x72.png' },
    { size: 96, name: 'icon-96x96.png' },
    { size: 128, name: 'icon-128x128.png' },
    { size: 144, name: 'icon-144x144.png' },
    { size: 152, name: 'icon-152x152.png' },
    { size: 192, name: 'icon-192x192.png' },
    { size: 256, name: 'icon-256x256.png' },
    { size: 384, name: 'icon-384x384.png' },
    { size: 512, name: 'icon-512x512.png' },
  ];

  const appleSizes = [
    { size: 57, name: 'apple-touch-icon-57x57.png' },
    { size: 60, name: 'apple-touch-icon-60x60.png' },
    { size: 72, name: 'apple-touch-icon-72x72.png' },
    { size: 76, name: 'apple-touch-icon-76x76.png' },
    { size: 114, name: 'apple-touch-icon-114x114.png' },
    { size: 120, name: 'apple-touch-icon-120x120.png' },
    { size: 144, name: 'apple-touch-icon-144x144.png' },
    { size: 152, name: 'apple-touch-icon-152x152.png' },
    { size: 180, name: 'apple-touch-icon-180x180.png' },
  ];

  console.log('Generating icons...');

  // Generate standard icons
  for (const { size, name } of sizes) {
    await sharp(Buffer.from(baseSvg))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Generated ${name}`);
  }

  // Generate Apple touch icons
  for (const { size, name } of appleSizes) {
    await sharp(Buffer.from(baseSvg))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Generated ${name}`);
  }

  // Generate favicon.ico (multi-size)
  await sharp(Buffer.from(baseSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Generated favicon.ico');

  // Generate maskable icon for PWA
  const maskableSvg = baseSvg.replace('rx="96"', 'rx="0"'); // Remove rounded corners for maskable
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'maskable-icon-512x512.png'));
  console.log('Generated maskable-icon-512x512.png');

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
