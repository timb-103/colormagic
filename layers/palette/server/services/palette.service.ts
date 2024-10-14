import type { PaletteDto } from '../dtos/palette.dto';
import { mapCreatePalettePrompt, mapPaletteEntityToDto } from '../helpers/palette.helper';
import type { PaletteRepository } from '../repositories/palette.repository';
import type { AIService } from '~/layers/ai/server/services/ai.service';

export class PaletteService {
  constructor(
    private readonly repository: PaletteRepository,
    private readonly aiService: AIService
  ) {}

  public async getById(id: string): Promise<PaletteDto> {
    const entity = await this.repository.getById(id);
    if (entity === null) {
      throw createError({ statusCode: 404 });
    }

    return mapPaletteEntityToDto(entity);
  }

  public async create(input: string): Promise<PaletteDto> {
    const prompt = mapCreatePalettePrompt(input);
    const response = await this.aiService.getByPrompt(prompt);

    const colors = [];
    if (response[0] !== undefined) {
      const colorText = `#${response[0]}`;
      colors.push(...(colorText.match(/#[0-9a-fA-F]{6}/g) ?? []));
    }

    const uniqueColors = [...new Set(colors)].sort((a, b) => {
      return parseInt(a.slice(1), 16) - parseInt(b.slice(1), 16);
    });

    // Function to sort by hex code
    console.log(response);

    const entity = await this.repository.create({
      colors: [uniqueColors[0], uniqueColors[1], uniqueColors[2], uniqueColors[3], uniqueColors[4]],
      arrange: {
        brightness: 0,
        saturation: 0,
        warmth: 0
      },
      text: input,
      createdAt: new Date()
    });

    return mapPaletteEntityToDto(entity);
  }
}
