import { ObjectId, type Collection, type Filter, type OptionalUnlessRequiredId } from 'mongodb';
import type { CreatablePaletteEntity, PaletteEntity } from '../entities/palette.entity';

export class PaletteRepository {
  constructor(private readonly collection: Collection<PaletteEntity>) {}

  public async setup(): Promise<void> {
    await this.collection.createIndexes([{
      key: { createdAt: -1 }
    }], { background: true });
  }

  public async list(page: number, size: number): Promise<PaletteEntity[]> {
    return await this.collection.find()
      .sort({ createdAt: -1 })
      .skip(page * size)
      .limit(size)
      .toArray();
  }

  public async count(filter?: Filter<PaletteEntity>): Promise<number> {
    return await this.collection.countDocuments(filter);
  }

  public async getById(id: string): Promise<PaletteEntity | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  public async create(entity: CreatablePaletteEntity): Promise<PaletteEntity> {
    const { insertedId } = await this.collection.insertOne(entity as OptionalUnlessRequiredId<PaletteEntity>);

    return {
      _id: insertedId,
      ...entity
    };
  }
}
