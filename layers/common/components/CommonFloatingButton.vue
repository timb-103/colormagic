<template>
  <div class="fixed bottom-0 right-0 mt-4 p-4 ">
    <div
      v-if="!isFeedbackOpen"
      class="flex justify-end gap-2"
    >
      <!-- github star button -->
      <UButton
        label="Star on GitHub"
        icon="i-fa6-brands-github"
        size="lg"
        @click="onClick()"
      />

      <!-- feedback button -->
      <UButton
        icon="i-heroicons-chat-bubble-bottom-center"
        class="rounded-full h-full aspect-[1/1]"
        size="lg"
        color="primary"
        @click="isFeedbackOpen = true"
      />
    </div>

    <!-- feedback card -->
    <UCard
      v-if="isFeedbackOpen"
      class="sm:w-96"
    >
      <div v-if="!submited">
        <!-- form -->
        <UForm
          :state="state"
          :schema="FormSchema"
          class="space-y-4"
          @submit="onSubmit"
        >
          <!-- email -->
          <UFormGroup
            label="Email"
            name="email"
          >
            <UInput
              v-model="state.email"
              type="email"
              placeholder="hello@youremail.com"
            />
          </UFormGroup>

          <!-- feedback -->
          <UFormGroup
            label="Leave us some feedback"
            name="feedback"
          >
            <UTextarea
              v-model="state.feedback"
              :rows="5"
              placeholder="Tell us how we can improve ColorMagic"
            />
          </UFormGroup>

          <!-- submit button -->
          <div class="flex justify-end gap-2 items-center">
            <UButton
              label="Close"
              size="sm"
              @click="isFeedbackOpen = false"
            />
            <UButton
              type="submit"
              color="primary"
              label="Submit"
              :loading="isPending"
            />
          </div>
        </UForm>
      </div>
      <div
        v-else
        class="text-center"
      >
        <p class="text-sm text-center max-w-60">
          Thank you for your feedback! We will get onto it asap.
        </p>
        <UButton
          class="mt-2"
          label="Reset"
          @click="submited = false"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { object, type InferType, string } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import { PlausibleEventName } from '~/layers/plausible/types';

const isFeedbackOpen = ref(false);
const submited = ref(false);
const { mutate: create, isPending } = useCreateFeedback();

const state = ref({
  feedback: '',
  email: ''
});

const FormSchema = object({
  email: string().required(),
  feedback: string().required()
});

export type Form = InferType<typeof FormSchema>;

function onClick(): void {
  void navigateTo('https://github.com/timb-103/colormagic', { external: true });
  sendPlausibleEvent(PlausibleEventName.GITHUB_BUTTON_FLOATING_CLICKED);
}

function onSubmit(event: FormSubmitEvent<Form>): void {
  create(event.data, {
    onSuccess: () => {
      submited.value = true;
    }
  });
}
</script>
