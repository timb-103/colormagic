import { ObjectId } from 'mongodb';
import type { PaletteLikeRepository } from '../repositories/palette-like.repository';
import { mapPaletteLikeEntityToDto } from '../helpers/palette.helper';
import type { PaletteLikeDto } from '../dtos/palette.dto';
import type { PaletteService } from './palette.service';

export class PaletteLikeService {
  constructor(
    private readonly repository: PaletteLikeRepository,
    private readonly paletteService: PaletteService
  ) {}

  public async getByPaletteId(userId: string, paletteId: string): Promise<PaletteLikeDto | null> {
    const entity = await this.repository.getByUserId(userId, paletteId);

    return entity !== null ? mapPaletteLikeEntityToDto(entity) : null;
  }

  public async create(userId: string, paletteId: string): Promise<PaletteLikeDto> {
    const found = await this.getByPaletteId(userId, paletteId);
    if (found !== null) {
      throw createError({ statusCode: 409, statusMessage: 'Already liked.' });
    }

    const entity = await this.repository.create({
      userId: new ObjectId(userId),
      paletteId: new ObjectId(paletteId),
      createdAt: new Date()
    });

    await this.paletteService.addLike(paletteId);

    return mapPaletteLikeEntityToDto(entity);
  }

  public async deleteByPaletteId(userId: string, paletteId: string): Promise<void> {
    const found = await this.repository.getByUserId(userId, paletteId);
    if (found?.userId.toHexString() !== userId) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' });
    }

    await Promise.all([
      this.repository.deleteById(found._id.toHexString()),
      this.paletteService.removeLike(paletteId)
    ]);
  }

  public async listByPaletteIds(userId: string, paletteId: string[]): Promise<PaletteLikeDto[]> {
    const entities = await this.repository.listByPaletteIds(userId, paletteId);

    return entities.map(entity => mapPaletteLikeEntityToDto(entity));
  }

  public async listByUserId(userId: string, page: number, size: number): Promise<PaletteLikeDto[]> {
    const entities = await this.repository.listByUserId(userId, page, size);

    return entities.map(entity => mapPaletteLikeEntityToDto(entity));
  }
}
