import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import toIcoModule from 'to-ico';
const toIco = toIcoModule.default || toIcoModule;

async function generateFavicon() {
  const sourceSvgPath = path.resolve('public', 'Flight on Budget logo-00.svg');
  const outputIcoPath = path.resolve('public', 'image.ico');

  const sizes = [16, 32, 48];
  const svgData = await fs.promises.readFile(sourceSvgPath);

  const pngBuffers = sizes.map((size) => {
    const resvg = new Resvg(svgData, {
      fitTo: { mode: 'width', value: size },
      background: 'rgba(0,0,0,0)'
    });
    const png = resvg.render();
    const u8 = png.asPng();
    return Buffer.isBuffer(u8) ? u8 : Buffer.from(u8);
  });

  const icoBuffer = await toIco(pngBuffers);
  await fs.promises.writeFile(outputIcoPath, icoBuffer);
  // eslint-disable-next-line no-console
  console.log(`Wrote favicon to: ${outputIcoPath}`);
}

generateFavicon().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed generating favicon.ico:', err);
  process.exit(1);
});


