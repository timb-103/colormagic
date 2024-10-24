import { type Static, Type } from '@sinclair/typebox';

export const UserDtoSchema = Type.Object({
  id: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  email: Type.Optional(Type.String({ format: 'email' })),
  name: Type.Optional(Type.String({ minLength: 1, maxLength: 100 }))
});

export type UserDto = Static<typeof UserDtoSchema>;
