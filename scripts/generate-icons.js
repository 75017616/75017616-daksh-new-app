import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Ensure public dir exists
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Function to generate pure RGBA PNG buffer
function createPng(width, height, isMaskable = false) {
  // RGBA buffer: (width * 4 + 1 filter byte) * height
  const rowStride = width * 4 + 1;
  const rawData = Buffer.alloc(rowStride * height);

  const cx = width / 2;
  const cy = height / 2;
  const rOuter = (width / 2) * (isMaskable ? 0.98 : 0.88);
  const cornerR = width * 0.22;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowStride;
    rawData[rowOffset] = 0; // Filter type: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;

      // Indigo to violet gradient
      const tY = y / height;
      const tX = x / width;
      
      // Base vibrant gradient (#4F46E5 Indigo to #7C3AED Violet to #06B6D4 Cyan accent)
      let r = Math.round(67 + tY * 40 - tX * 20);
      let g = Math.round(56 + tX * 30 + tY * 10);
      let b = Math.round(202 + tY * 40 + tX * 25);
      let a = 255;

      // Rounded squircle mask if not maskable
      if (!isMaskable) {
        // Distance to rounded rectangle
        const dx = Math.max(Math.abs(x - cx) - (cx - cornerR), 0);
        const dy = Math.max(Math.abs(y - cy) - (cy - cornerR), 0);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > cornerR) {
          a = 0;
        } else if (dist > cornerR - 1.5) {
          a = Math.round(255 * (cornerR - dist) / 1.5);
        }
      }

      // Inside icon glyph: Stylized "D" + Starburst / Sparkle
      const relX = (x - cx) / (width * 0.45);
      const relY = (y - cy) / (height * 0.45);

      // Starburst in top-right
      const sx = relX - 0.45;
      const sy = relY + 0.45;
      const sDist = Math.sqrt(sx * sx + sy * sy);
      const sAngle = Math.atan2(sy, sx);
      const sPoints = 4;
      const sFactor = (1 + 0.5 * Math.cos(sAngle * sPoints));
      if (sDist < 0.22 * sFactor) {
        // Gold/Cyan glow
        r = 254; g = 240; b = 138;
      }

      // Stylized letter "D" or Brain / Compass
      // Outer arc of D
      if (relX >= -0.55 && relX <= 0.45 && relY >= -0.65 && relY <= 0.65) {
        // Left spine
        const isSpine = relX >= -0.55 && relX <= -0.32;
        // Outer curved lobe
        const lobeDist = Math.sqrt(Math.pow((relX - (-0.25)) / 0.7, 2) + Math.pow(relY / 0.65, 2));
        const isOuterLobe = lobeDist <= 1.0;
        const isInnerHole = Math.sqrt(Math.pow((relX - (-0.18)) / 0.42, 2) + Math.pow(relY / 0.40, 2)) < 0.95;

        if ((isSpine || isOuterLobe) && !isInnerHole) {
          // White crisp letterform with subtle top-to-bottom glow
          r = 255;
          g = 255;
          b = 255;
        }
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  // Deflate raw scanlines
  const compressed = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // CRC calculation
  function crc32(buf) {
    let c;
    const table = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c;
    }
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const chunkType = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const typeAndData = Buffer.concat([chunkType, data]);
    crcBuf.writeUInt32BE(crc32(typeAndData), 0);
    return Buffer.concat([len, typeAndData, crcBuf]);
  }

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: 6 (RGBA)
  ihdrData[10] = 0; // Compression: 0 (deflate)
  ihdrData[11] = 0; // Filter: 0 (standard)
  ihdrData[12] = 0; // Interlace: 0 (no interlace)
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT Chunk
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND Chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Write icons
const icon192 = createPng(192, 192, false);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);

const icon512 = createPng(512, 512, false);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);

const iconMaskable = createPng(512, 512, true);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), iconMaskable);

const appleIcon = createPng(180, 180, false);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// Favicon 32x32
const favicon = createPng(32, 32, false);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), favicon);

// Brand SVG
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="dakshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="50%" stop-color="#7C3AED" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="115" fill="url(#dakshGrad)" />
  <path d="M150 120 H260 C340 120 390 170 390 256 C390 342 340 392 260 392 H150 Z M215 180 V332 H256 C300 332 328 305 328 256 C328 207 300 180 256 180 Z" fill="#FFFFFF" filter="url(#shadow)" />
  <polygon points="370,110 382,135 407,147 382,159 370,184 358,159 333,147 358,135" fill="#FEF08A" />
</svg>`;
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svg);

console.log('Successfully generated all PWA icons in /public: 192x192, 512x512, maskable, apple-touch-icon, favicon, icon.svg');
