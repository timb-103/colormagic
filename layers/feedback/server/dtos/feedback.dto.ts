import { type Static, Type } from '@sinclair/typebox';

export const CreateFeedbackInputDtoSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  feedback: Type.String({ maxLength: 5000 })
});

export type CreateFeedbackInputDto = Static<typeof CreateFeedbackInputDtoSchema>;
