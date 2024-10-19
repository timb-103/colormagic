import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

export class OgService {
  private async loadLogo(): Promise<string> {
    return await new Promise((resolve, reject) => {
      fs.readFile(path.resolve('public/img/HorizontalLogo.svg'), 'utf8', (err, data) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  private async generateSVG(colors: string[], prompt: string): Promise<string> {
    const width = 1200;
    const height = 630;
    const cardWidth = 480;
    const cardHeight = 200;
    const cardX = (width - cardWidth) / 2;
    const cardY = (height - cardHeight) / 2;
    const logoSvg = await this.loadLogo();

    /** @description build color rectangles */
    const colorBars = colors.map((color, i) => {
      const rectWidth = width / colors.length;
      const x = i * rectWidth;
      return `<rect x="${x}" y="0" width="${rectWidth}" height="${height}" fill="#${color}" />`;
    }).join('');

    /** @description build the svg */
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <!-- Background color bars -->
        ${colorBars}
        
        <!-- Card (Rounded Rectangle) -->
        <rect x="${cardX}" y="${cardY}" rx="24" ry="24" width="${cardWidth}" height="${cardHeight}" fill="#fff" />

        <!-- Text -->
        <text x="50%" y="54%" font-size="56" font-weight="bold" font-family="-apple-system, BlinkMacSystemFont, 'Avenir Next', Avenir, 'Nimbus Sans L', Roboto, Noto, 'Segoe UI', Arial, Helvetica, 'Helvetica Neue', sans-serif" fill="#4E5460" text-anchor="middle" dy=".35em">${prompt}</text>

        <!-- Inline Logo -->
        <g transform="translate(${width / 2 - 125}, ${cardY + 30})">
          ${logoSvg}
        </g>
      </svg>
    `;

    return svg;
  }

  public async generateImage(colors: string[], prompt: string): Promise<Buffer> {
    const svg = await this.generateSVG(colors, prompt);
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return pngBuffer;
  }
}
