import { ObjectId } from 'mongodb';
import type { PaletteLikeRepository } from '../repositories/palette-like.repository';
import { mapPaletteLikeEntityToDto } from '../helpers/palette.helper';
import type { PaletteLikeDto } from '../dtos/palette-like.dto';

export class PaletteLikeService {
  constructor(
    private readonly repository: PaletteLikeRepository
  ) {}

  public async getByPaletteId(userId: string, paletteId: string): Promise<PaletteLikeDto | null> {
    const entity = await this.repository.getByUserId(userId, paletteId);

    return entity !== null ? mapPaletteLikeEntityToDto(entity) : null;
  }

  public async create(userId: string, paletteId: string): Promise<PaletteLikeDto> {
    const entity = await this.repository.create({
      userId: new ObjectId(userId),
      paletteId: new ObjectId(paletteId),
      createdAt: new Date()
    });

    return mapPaletteLikeEntityToDto(entity);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.deleteById(id);
  }

  public async listByUserId(userId: string, page: number, size: number): Promise<PaletteLikeDto[]> {
    const entities = await this.repository.listByUserId(userId, page, size);

    return entities.map(entity => mapPaletteLikeEntityToDto(entity));
  }

  public async listByPaletteIds(userId: string, ids: string[]): Promise<PaletteLikeDto[]> {
    const entities = await this.repository.listByPaletteIds(userId, ids);

    return entities.map(entity => mapPaletteLikeEntityToDto(entity));
  }
}
