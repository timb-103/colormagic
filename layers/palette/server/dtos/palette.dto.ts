import { type Static, Type } from '@sinclair/typebox';

export const PaletteDtoSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  colors: Type.Array(Type.String(), { minItems: 5, maxItems: 5 }),
  text: Type.String()
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

export const CountPaletteDtoSchema = Type.Object({
  count: Type.Number()
});

export type CountPaletteDto = Static<typeof CountPaletteDtoSchema>;
