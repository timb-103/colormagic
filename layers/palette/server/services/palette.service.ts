import type { Filter } from 'mongodb';
import type { ListPaletteDto, ListPaletteInputDto, PaletteDto } from '../dtos/palette.dto';
import { mapCreatePalettePrompt, mapPaletteEntityToDto, mapTagsPrompt } from '../helpers/palette.helper';
import type { PaletteRepository } from '../repositories/palette.repository';
import { arrangeColors } from '../../utils/color-arrange.util';
import type { PaletteEntity } from '../entities/palette.entity';
import type { AIService } from '~/layers/ai/server/services/ai.service';

export class PaletteService {
  constructor(
    private readonly repository: PaletteRepository,
    private readonly aiService: AIService
  ) {}

  public async list(page: number, size: number, filter: ListPaletteInputDto['filter']): Promise<ListPaletteDto> {
    let colFilter: Filter<PaletteEntity> = {};

    if (filter !== undefined) {
      colFilter = {
        tags: {
          $in: [filter.tag]
        }
      };
    }

    const [entities, count] = await Promise.all([
      this.repository.list(page, size, colFilter),
      this.repository.count(colFilter)
    ]);

    return {
      items: entities.map(entity => mapPaletteEntityToDto(entity)),
      count
    };
  }

  public async listByIds(ids: string[]): Promise<PaletteDto[]> {
    const entities = await this.repository.listByIds(ids);

    return entities.map(entity => mapPaletteEntityToDto(entity));
  }

  public async getById(id: string): Promise<PaletteDto> {
    const entity = await this.repository.getById(id);
    if (entity === null) {
      throw createError({ statusCode: 404 });
    }

    return mapPaletteEntityToDto(entity);
  }

  public async cloneById(id: string, colors: string[]): Promise<PaletteDto> {
    const found = await this.getById(id);
    const prompt = mapTagsPrompt(colors);
    const response = await this.aiService.getByPrompt(prompt);
    const tags = response[0].match(/\[tags:(.*?)\]/)?.[1]?.toLowerCase().split(',') ?? [];

    const entity = await this.repository.create({
      colors: [colors[0], colors[1], colors[2], colors[3], colors[4]],
      text: found.text,
      tags,
      createdAt: new Date()
    });

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

    const name = response[0].match(/\[name:(.*?)\]/)?.[1] ?? 'Cool Palette';
    const tags = response[0].match(/\[tags:(.*?)\]/)?.[1]?.toLowerCase().split(',') ?? [];

    /** @description arrange the colors in order */
    const colorsNew = arrangeColors([...new Set(colors)], {
      brightness: 0,
      saturation: 0,
      warmth: 0
    });

    const entity = await this.repository.create({
      colors: [colorsNew[0], colorsNew[1], colorsNew[2], colorsNew[3], colorsNew[4]],
      text: name,
      tags,
      createdAt: new Date()
    });

    return mapPaletteEntityToDto(entity);
  }

  public async count(from?: Date): Promise<number> {
    let filter: Filter<PaletteEntity> = {};

    if (from !== undefined) {
      filter = {
        createdAt: {
          $gte: from
        }
      };
    }

    return await this.repository.count(filter);
  }

  public async addLike(id: string): Promise<void> {
    await this.repository.updateLikesCount(id, 1);
  }

  public async removeLike(id: string): Promise<void> {
    await this.repository.updateLikesCount(id, -1);
  }
}
