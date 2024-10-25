import { type Static, Type } from '@sinclair/typebox';

export const OgInputDtoSchema = Type.Object({
  colors: Type.String(),
  text: Type.String(),
  aspect: Type.Optional(Type.Literal('square'))
});

export type OgInputDto = Static<typeof OgInputDtoSchema>;

export const OgTagInputDtoSchema = Type.Object({
  tag: Type.String(),
  text: Type.String()
});

export type OgTagInputDto = Static<typeof OgTagInputDtoSchema>;

export const OgThumbnailInputDtoSchema = Type.Object({
  colors: Type.String()
});

export type OgThumbnailInputDto = Static<typeof OgThumbnailInputDtoSchema>;
