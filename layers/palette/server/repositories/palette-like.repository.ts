import { ObjectId, type Collection, type OptionalUnlessRequiredId } from 'mongodb';
import type { CreatablePaletteLikeEntity, PaletteLikeEntity } from '../entities/palette.entity';

export class PaletteLikeRepository {
  constructor(private readonly collection: Collection<PaletteLikeEntity>) {}

  public async setup(): Promise<void> {
    await this.collection.createIndexes([{
      key: { createdAt: -1 }
    }, {
      key: { userId: -1 }
    }, {
      key: {
        userId: -1,
        paletteId: -1
      }
    }], { background: true });
  }

  public async listByPaletteIds(userId: string, paletteIds: string[]): Promise<PaletteLikeEntity[]> {
    return await this.collection.find({
      userId: new ObjectId(userId),
      paletteId: {
        $in: paletteIds.map(v => new ObjectId(v))
      }
    })
      .sort({ createdAt: -1 })
      .toArray();
  }

  public async listByUserId(userId: string, page: number, size: number): Promise<PaletteLikeEntity[]> {
    return await this.collection.find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .skip(page * size)
      .limit(size)
      .toArray();
  }

  public async getByUserId(userId: string, paletteId: string): Promise<PaletteLikeEntity | null> {
    return await this.collection.findOne({
      userId: new ObjectId(userId),
      paletteId: new ObjectId(paletteId)
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  public async create(doc: CreatablePaletteLikeEntity): Promise<PaletteLikeEntity> {
    const entity: CreatablePaletteLikeEntity = {
      ...doc,
      createdAt: new Date()
    };

    const { insertedId } = await this.collection.insertOne(entity as OptionalUnlessRequiredId<PaletteLikeEntity>);

    return {
      _id: insertedId,
      ...entity
    };
  }
}
