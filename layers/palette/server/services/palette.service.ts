import type { PaletteDto } from '../dtos/palette.dto';
import { mapCreatePalettePrompt, mapPaletteEntityToDto } from '../helpers/palette.helper';
import type { PaletteRepository } from '../repositories/palette.repository';
import { arrangeColors } from '../../utils/color-arrange.util';
import type { AIService } from '~/layers/ai/server/services/ai.service';

export class PaletteService {
  constructor(
    private readonly repository: PaletteRepository,
    private readonly aiService: AIService
  ) {}

  public async list(page: number, size: number): Promise<PaletteDto[]> {
    const entities = await this.repository.list(page, size);

    return entities.map(entity => mapPaletteEntityToDto(entity));
  }

  public async getById(id: string): Promise<PaletteDto> {
    const entity = await this.repository.getById(id);
    if (entity === null) {
      throw createError({ statusCode: 404 });
    }

    return mapPaletteEntityToDto(entity);
  }

  public async create(input: string, colors?: string[]): Promise<PaletteDto> {
    let colorsNew = colors;
    let name = 'Cool Palette';

    /** @description get colors from ai */
    if (colorsNew === undefined) {
      const prompt = mapCreatePalettePrompt(input);
      const response = await this.aiService.getByPrompt(prompt);

      const colors = [];
      if (response[0] !== undefined) {
        const colorText = `#${response[0]}`;
        colors.push(...(colorText.match(/#[0-9a-fA-F]{6}/g) ?? []));
      }

      name = response[0].match(/\[name:(.*?)\]/)?.[1] ?? 'Cool Palette';

      colorsNew = arrangeColors([...new Set(colors)], {
        brightness: 0,
        saturation: 0,
        warmth: 0
      });
    }

    const entity = await this.repository.create({
      colors: [colorsNew[0], colorsNew[1], colorsNew[2], colorsNew[3], colorsNew[4]],
      text: name,
      createdAt: new Date()
    });

    return mapPaletteEntityToDto(entity);
  }
}
