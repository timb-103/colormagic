import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import type { PaletteService } from '~/layers/palette/server/services/palette.service';
import { PaletteSortBy } from '~/layers/palette/types';

export interface SvgParams {
  text?: string
  width?: number
  height?: number
}

export class OgService {
  constructor(private readonly paletteService: PaletteService) {}

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

  private async generateSVG(colors: string[], params: SvgParams): Promise<string> {
    const width = params.width ?? 1200;
    const height = params.height ?? 630;
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

    const textCard = params.text !== undefined
      ? `
      <!-- Card (Rounded Rectangle) -->
        <rect x="${cardX}" y="${cardY}" rx="24" ry="24" width="${cardWidth}" height="${cardHeight}" fill="#fff" />

        <!-- Text -->
        <text x="50%" y="54%" font-size="56" font-weight="bold" font-family="-apple-system, BlinkMacSystemFont, 'Avenir Next', Avenir, 'Nimbus Sans L', Roboto, Noto, 'Segoe UI', Arial, Helvetica, 'Helvetica Neue', sans-serif" fill="#4E5460" text-anchor="middle" dy=".35em">${params.text}</text>

        <!-- Inline Logo -->
        <g transform="translate(${width / 2 - 125}, ${cardY + 30})">
          ${logoSvg}
        </g>
    `
      : '';

    /** @description build the svg */
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <!-- Background color bars -->
        ${colorBars}
        
        <!-- Card (Rounded Rectangle) -->
        ${textCard}
      </svg>
    `;

    return svg;
  }

  private async generateGridBackground(palettes: string[][], prompt: string): Promise<string> {
    const width = 1200;
    const height = 630;
    const numCols = 4;
    const numRows = Math.ceil(palettes.length / numCols);
    const gap = 40;
    const paletteWidth = (width - (numCols - 1) * gap) / numCols;
    const paletteHeight = (height - (numRows - 1) * gap) / numRows;
    const cardWidth = 480;
    const cardHeight = 200;
    const cardX = (width - cardWidth) / 2;
    const cardY = (height - cardHeight) / 2;
    const logoSvg = await this.loadLogo();

    const svgPalettes: string[] = [];

    palettes.forEach((palette, paletteIndex) => {
      const rowIndex = Math.floor(paletteIndex / numCols);
      const colIndex = paletteIndex % numCols;
      const x = colIndex * (paletteWidth + gap);
      const y = rowIndex * (paletteHeight + gap);

      const clipPathId = `clip-path-${paletteIndex}`;
      const clipPath = `
        <clipPath id="${clipPathId}">
          <rect x="${x}" y="${y}" width="${paletteWidth}" height="${paletteHeight}" rx="24" ry="24" />
        </clipPath>
      `;

      const paletteBackground = `<rect x="${x}" y="${y}" width="${paletteWidth}" height="${paletteHeight}" fill="#fff" rx="12" ry="12" />`;

      const colorBars = palette.map((color, colorIndex) => {
        const barWidth = paletteWidth / palette.length;
        const colorX = x + colorIndex * barWidth;
        return `<rect x="${colorX}" y="${y}" width="${barWidth}" height="${paletteHeight}" fill="${color}" clip-path="url(#${clipPathId})" />`;
      }).join('');

      svgPalettes.push(clipPath + paletteBackground + colorBars);
    });

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="#ffffff" />
        ${svgPalettes.join('')}
        <rect x="${cardX}" y="${cardY}" rx="24" ry="24" width="${cardWidth}" height="${cardHeight}" fill="#fff" />
        <text x="50%" y="54%" font-size="56" font-weight="bold" font-family="-apple-system, BlinkMacSystemFont, 'Avenir Next', Avenir, 'Nimbus Sans L', Roboto, Noto, 'Segoe UI', Arial, Helvetica, 'Helvetica Neue', sans-serif" fill="#4E5460" text-anchor="middle" dy=".35em">${prompt}</text>
        <g transform="translate(${width / 2 - 125}, ${cardY + 30})">
          ${logoSvg}
        </g>
      </svg>
    `;

    return svg;
  }

  public async generateGridImageFromTags(tag: string, prompt: string): Promise<Buffer> {
    const palettes = await this.paletteService.list(0, 16, {
      tags: [tag],
      sortBy: PaletteSortBy.RECENT
    });

    const svg = await this.generateGridBackground(palettes.items.map(v => v.colors), prompt);
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return pngBuffer;
  }

  public async generateImage(colors: string[], prompt: string): Promise<Buffer> {
    const svg = await this.generateSVG(colors, { text: prompt });
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return pngBuffer;
  }

  public async generateSquareThumbnail(colors: string[]): Promise<Buffer> {
    const svg = await this.generateSVG(colors, { width: 150, height: 150 });
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return pngBuffer;
  }
}
