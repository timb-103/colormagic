import { type Static, Type } from '@sinclair/typebox';
import { PaletteSortBy } from '../../types';

export const PaletteDtoSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  colors: Type.Array(Type.String(), { minItems: 5, maxItems: 5 }),
  text: Type.String(),
  tags: Type.Array(Type.String()),
  likesCount: Type.Number(),
  isLiked: Type.Optional(Type.Boolean())
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
  page: Type.String({ pattern: '^[0-9]+$' }),
  size: Type.Optional(Type.String({ pattern: '^[0-9]+$', maxLength: 3 })),
  tags: Type.Optional(Type.String({ maxLength: 500 })),
  sortBy: Type.Enum(PaletteSortBy)
});

export type ListPaletteInputDto = Static<typeof ListPaletteInputDtoSchema>;

export const ListPaletteDtoSchema = Type.Object({
  items: Type.Array(PaletteDtoSchema),
  count: Type.Number()
});

export type ListPaletteDto = Static<typeof ListPaletteDtoSchema>;

export const CountPaletteDtoSchema = Type.Object({
  count: Type.Number()
});

export type CountPaletteDto = Static<typeof CountPaletteDtoSchema>;

export const ClonePaletteInputParamsDtoSchema = Type.Pick(PaletteDtoSchema, ['id']);

export type ClonePaletteInputParamsDto = Static<typeof ClonePaletteInputParamsDtoSchema>;

export const ClonePaletteInputQueryDtoSchema = Type.Pick(PaletteDtoSchema, ['colors']);

export type ClonePaletteInputQueryDto = Static<typeof ClonePaletteInputQueryDtoSchema>;
