import { type Static, Type } from '@sinclair/typebox';

export const PaletteDtoSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  colors: Type.Array(Type.String(), { minItems: 5, maxItems: 5 }),
  text: Type.String(),
  tags: Type.Array(Type.String()),
  likesCount: Type.Number()
});

export type PaletteDto = Static<typeof PaletteDtoSchema>;

export const PaletteInputDtoSchema = Type.Object({
  id: PaletteDtoSchema.properties.id
});

export type PaletteInputDto = Static<typeof PaletteInputDtoSchema>;

export const CreatePaletteInputDtoSchema = Type.Object({
  prompt: Type.String(),
  colors: Type.Optional(PaletteDtoSchema.properties.colors)
});

export type CreatePaletteInputDto = Static<typeof CreatePaletteInputDtoSchema>;

export const ListPaletteInputDtoSchema = Type.Object({
  page: Type.Number(),
  size: Type.Number({ maximum: 100 }),
  filter: Type.Optional(Type.Object({
    tag: Type.String()
  }))
});

export type ListPaletteInputDto = Static<typeof ListPaletteInputDtoSchema>;

export const ListPaletteDtoSchema = Type.Object({
  items: Type.Array(PaletteDtoSchema),
  count: Type.Number()
});

export type ListPaletteDto = Static<typeof ListPaletteDtoSchema>;

export const ListPalettebyIdsInputDtoSchema = Type.Object({
  paletteIds: Type.Array(PaletteDtoSchema.properties.id, {
    maxItems: 200
  })
});

export type ListPalettebyIdsInputDto = Static<typeof ListPalettebyIdsInputDtoSchema>;

export const CountPaletteDtoSchema = Type.Object({
  count: Type.Number()
});

export type CountPaletteDto = Static<typeof CountPaletteDtoSchema>;

export const ClonePaletteInputDtoSchema = Type.Pick(PaletteDtoSchema, ['id', 'colors']);

export type ClonePaletteInputDto = Static<typeof ClonePaletteInputDtoSchema>;

/** @description likes */
export const PaletteLikeDtoSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  paletteId: Type.String({ pattern: '^[0-9a-fA-F]{24}$' })
});

export type PaletteLikeDto = Static<typeof PaletteLikeDtoSchema>;

export const PaletteLikeInputDtoSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' })
});

export type PaletteLikeInputDto = Static<typeof PaletteLikeInputDtoSchema>;

export const CreatePaletteLikeInputDtoSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' })
});

export type CreatePaletteLikeInputDto = Static<typeof CreatePaletteLikeInputDtoSchema>;

export const DeletePaletteLikeInputDtoSchema = Type.Object({
  id: PaletteLikeDtoSchema.properties.paletteId
});

export type DeletePaletteLikeInputDto = Static<typeof DeletePaletteLikeInputDtoSchema>;

export const ListPaletteLikesbyIdsInputDtoSchema = Type.Object({
  paletteIds: Type.Array(PaletteLikeDtoSchema.properties.paletteId, {
    maxItems: 200
  })
});

export type ListPaletteLikesbyIdsInputDto = Static<typeof ListPaletteLikesbyIdsInputDtoSchema>;

export const ListPaletteLikesDtoSchema = Type.Object({
  items: Type.Array(PaletteLikeDtoSchema.properties.paletteId)
});

export type ListPaletteLikesDto = Static<typeof ListPaletteLikesDtoSchema>;

export const ListPaletteLikesInputDtoSchema = Type.Object({
  page: Type.Number(),
  size: Type.Number({ maximum: 200 })
});

export type ListPaletteLikesInputDto = Static<typeof ListPaletteLikesInputDtoSchema>;
