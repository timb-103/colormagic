import type { ObjectId } from 'mongodb';

export interface PaletteEntity {
  _id: ObjectId
  colors: [string, string, string, string, string]
  arrange: {
    brightness: number
    saturation: number
    warmth: number
  }
  text: string
  createdAt: Date
}

export type CreatablePaletteEntity = Omit<PaletteEntity, '_id'>;
