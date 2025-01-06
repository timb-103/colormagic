import sharp from 'sharp';
import type { PaletteService } from '~/layers/palette/server/services/palette.service';
import { PaletteSortBy } from '~/layers/palette/types';

export interface SvgParams {
  width?: number
  height?: number
}

export class ImageService {
  constructor(private readonly paletteService: PaletteService) {}

  private async generateSVG(colors: string[], params?: SvgParams): Promise<string> {
    const width = params?.width ?? 1200;
    const height = params?.height ?? 630;

    /** @description build color rectangles */
    const colorBars = colors.map((color, i) => {
      const rectWidth = width / colors.length;
      const x = i * rectWidth;
      return `<rect x="${x}" y="0" width="${rectWidth}" height="${height}" fill="#${color.replace('#', '')}" />`;
    }).join('');

    /** @description build the svg */
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <!-- Background color bars -->
        ${colorBars}
      </svg>
    `;

    return svg;
  }

  public async generateById(id: string): Promise<Buffer> {
    const palette = await this.paletteService.getById(id);

    const svg = await this.generateSVG(palette.colors);
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return pngBuffer;
  }

  public async generateByTag(tag: string): Promise<Buffer> {
    const { items: [palette] } = await this.paletteService.list(0, 1, {
      tags: [tag],
      sortBy: PaletteSortBy.POPULAR
    });

    const svg = await this.generateSVG(palette.colors);
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return pngBuffer;
  }

  public async generateByColors(colors: string[]): Promise<Buffer> {
    const svg = await this.generateSVG(colors);
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return pngBuffer;
  }

  public async generateSquareThumbnail(colors: string[]): Promise<Buffer> {
    const svg = await this.generateSVG(colors, { width: 150, height: 150 });
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return pngBuffer;
  }
}
