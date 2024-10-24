import type { ObjectId } from 'mongodb';

export interface PaletteEntity {
  _id: ObjectId
  colors: [string, string, string, string, string]
  text: string
  tags?: string[]
  likesCount?: number
  createdAt: Date
}

export type CreatablePaletteEntity = Omit<PaletteEntity, '_id'>;

export interface PaletteLikeEntity {
  _id: ObjectId
  paletteId: ObjectId
  userId: ObjectId
  createdAt: Date
}

export type CreatablePaletteLikeEntity = Omit<PaletteLikeEntity, '_id'>;
