import { ObjectId, type Collection, type OptionalUnlessRequiredId } from 'mongodb';
import type { CreatableUserEntity, UserEntity } from '../entities/user.entity';

export class UserRepository {
  constructor(private readonly collection: Collection<UserEntity>) {}

  public async getById(id: string): Promise<UserEntity | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  public async getByEmail(email: string): Promise<UserEntity | null> {
    return await this.collection.findOne({ email });
  }

  public async getByGoogleId(googleId: string): Promise<UserEntity | null> {
    return await this.collection.findOne({ googleId });
  }

  public async create(entity: CreatableUserEntity): Promise<UserEntity> {
    const { insertedId } = await this.collection.insertOne(entity as OptionalUnlessRequiredId<UserEntity>);

    return {
      _id: insertedId,
      ...entity
    };
  }
}
