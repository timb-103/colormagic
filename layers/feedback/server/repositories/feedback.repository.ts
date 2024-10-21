import { type Collection, type OptionalUnlessRequiredId } from 'mongodb';
import type { CreatableFeedbackEntity, FeedbackEntity } from '../entities/feedback.entity';

export class FeedbackRepository {
  constructor(private readonly collection: Collection<FeedbackEntity>) {}

  public async create(entity: CreatableFeedbackEntity): Promise<FeedbackEntity> {
    const { insertedId } = await this.collection.insertOne(entity as OptionalUnlessRequiredId<FeedbackEntity>);

    return {
      _id: insertedId,
      ...entity
    };
  }
}
