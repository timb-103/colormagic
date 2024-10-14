import { type Static, Type } from '@sinclair/typebox';

export const PaletteDtoSchema = Type.Object({
  id: Type.String(),
  colors: Type.Tuple([
    Type.String(),
    Type.String(),
    Type.String(),
    Type.String(),
    Type.String()
  ]),
  arrange: Type.Object({
    brightness: Type.Number(),
    saturation: Type.Number(),
    warmth: Type.Number()
  }),
  text: Type.String()
});

export type PaletteDto = Static<typeof PaletteDtoSchema>;

export const PaletteInputDtoSchema = Type.Object({
  id: Type.String()
});

export type PaletteInputDto = Static<typeof PaletteInputDtoSchema>;

export const CreatePaletteInputDtoSchema = Type.Object({
  prompt: Type.String()
});

export type CreatePaletteInputDto = Static<typeof CreatePaletteInputDtoSchema>;
