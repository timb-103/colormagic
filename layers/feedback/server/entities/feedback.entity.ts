import type { ObjectId } from 'mongodb';

export interface FeedbackEntity {
  _id: ObjectId
  email: string
  feedback: string
}

export type CreatableFeedbackEntity = Omit<FeedbackEntity, '_id'>;
