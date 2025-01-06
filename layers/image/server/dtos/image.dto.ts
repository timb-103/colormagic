import { type Static, Type } from '@sinclair/typebox';

export const ImageByColorsInputDtoSchema = Type.Object({
  colors: Type.String(),
  aspect: Type.Optional(Type.Literal('square'))
});

export type ImageByColorsInputDto = Static<typeof ImageByColorsInputDtoSchema>;

export const ImageByIdInputDtoSchema = Type.Object({
  id: Type.String()
});

export type ImageByIdInputDto = Static<typeof ImageByIdInputDtoSchema>;

export const ImageByTagInputDtoSchema = Type.Object({
  tag: Type.String()
});

export type ImageByTagInputDto = Static<typeof ImageByTagInputDtoSchema>;
