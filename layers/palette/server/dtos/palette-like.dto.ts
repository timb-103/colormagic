import { type Static, Type } from '@sinclair/typebox';

export const PaletteLikeDtoSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  userId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  paletteId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' })
});

export type PaletteLikeDto = Static<typeof PaletteLikeDtoSchema>;

export const CreatePaletteLikeInputDtoSchema = Type.Object({
  id: PaletteLikeDtoSchema.properties.paletteId
});

export type CreatePaletteLikeInputDto = Static<typeof CreatePaletteLikeInputDtoSchema>;

export const DeletePaletteLikeInputDtoSchema = Type.Object({
  id: PaletteLikeDtoSchema.properties.paletteId
});

export type DeletePaletteLikeInputDto = Static<typeof DeletePaletteLikeInputDtoSchema>;
