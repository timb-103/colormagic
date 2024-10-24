import { type Static, Type } from '@sinclair/typebox';

export const GoogleAuthUrlInputDtoSchema = Type.Object({
  state: Type.String()
});

export type GoogleAuthUrlInputDto = Static<typeof GoogleAuthUrlInputDtoSchema>;

export const GoogleAuthUrlDtoSchema = Type.Object({
  url: Type.String()
});

export type GoogleAuthUrlDto = Static<typeof GoogleAuthUrlDtoSchema>;

export const GoogleAuthInputDtoSchema = Type.Object({
  code: Type.String()
});

export type GoogleAuthInputDto = Static<typeof GoogleAuthInputDtoSchema>;
