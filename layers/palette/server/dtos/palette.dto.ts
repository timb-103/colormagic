import { type Static, Type } from '@sinclair/typebox';

export const PaletteDtoSchema = Type.Object({
  id: Type.String(),
  colors: Type.Array(Type.String(), { minItems: 5, maxItems: 5 }),
  text: Type.String()
});

export type PaletteDto = Static<typeof PaletteDtoSchema>;

export const PaletteInputDtoSchema = Type.Object({
  id: Type.String()
});

export type PaletteInputDto = Static<typeof PaletteInputDtoSchema>;

export const CreatePaletteInputDtoSchema = Type.Object({
  prompt: Type.String(),
  colors: Type.Optional(PaletteDtoSchema.properties.colors)
});

export type CreatePaletteInputDto = Static<typeof CreatePaletteInputDtoSchema>;
