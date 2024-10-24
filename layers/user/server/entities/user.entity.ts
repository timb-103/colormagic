import type { ObjectId } from 'mongodb';

export interface UserEntity {
  _id: ObjectId
  email?: string
  name?: string
  googleId?: string
  githubId?: string
  createdAt: Date
  lastLoginAt: Date
}

export type CreatableUserEntity = Omit<UserEntity, '_id'>;

export type UpdatableUserEntity = Pick<UserEntity, 'googleId' | 'lastLoginAt'>;
