/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation } from '@tanstack/vue-query';
import type { CreateFeedbackInputDto } from '../server/dtos/feedback.dto';

export function useCreateFeedback() {
  return useMutation({
    mutationFn: async (params: CreateFeedbackInputDto) => {
      const response = await $fetch('/api/feedback/create', {
        method: 'POST',
        body: {
          email: params.email,
          feedback: params.feedback
        }
      });

      return response;
    }
  });
}
