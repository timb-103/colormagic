import { ObjectId, type Collection, type OptionalUnlessRequiredId } from 'mongodb';
import type { CreatablePaletteEntity, PaletteEntity } from '../entities/palette.entity';

export class PaletteRepository {
  constructor(private readonly collection: Collection<PaletteEntity>) {}

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
