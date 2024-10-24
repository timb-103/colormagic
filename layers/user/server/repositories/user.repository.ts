import { ObjectId, type Collection, type OptionalUnlessRequiredId } from 'mongodb';
import type { CreatableUserEntity, UpdatableUserEntity, UserEntity } from '../entities/user.entity';

export class UserRepository {
  constructor(private readonly collection: Collection<UserEntity>) {}

  public async getById(id: string): Promise<UserEntity | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  public async getByEmail(email: string): Promise<UserEntity | null> {
    return await this.collection.findOne({ email: email.toLowerCase() });
  }

  public async getByGoogleId(googleId: string): Promise<UserEntity | null> {
    return await this.collection.findOne({ googleId });
  }

  public async create(doc: CreatableUserEntity): Promise<UserEntity> {
    const entity: CreatableUserEntity = {
      ...doc,
      createdAt: new Date()
    };

    const { insertedId } = await this.collection.insertOne(entity as OptionalUnlessRequiredId<UserEntity>);

    return {
      _id: insertedId,
      ...entity
    };
  }

  public async updateById(id: string, entity: Partial<UpdatableUserEntity>): Promise<UserEntity> {
    const response = await this.collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
      $set: entity
    });

    if (response === null) {
      throw createError({ statusCode: 404 });
    }

    return response;
  }
}
