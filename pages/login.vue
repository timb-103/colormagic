<template>
  <div>
    <!-- header-->
    <div class="mb-4">
      <!-- title -->
      <h1>
        {{ $t('login.title') }}
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        {{ description }}
      </p>
    </div>

    <UButton
      icon="i-fa6-brands-google"
      color="primary"
      :loading="isGooglePending || isRedirectingToGoogle"
      size="xl"
      :label="$t('login.google')"
      @click="onGoogleRedirect()"
    />
  </div>
</template>

<script setup lang="ts">
import { decodeState, OAuthProvider, encodeState } from '~/layers/auth/helpers/oauth.helper';
import { PlausibleEventName } from '~/layers/plausible/types';

const { query, path } = useRoute();

const { mutate: googleAuthLogin, isPending: isGooglePending } = useGoogleAuthLogin();
const { mutate: redirectToGoogle, isPending: isRedirectingToGoogle } = useGoogleAuthRedirect();
const notifications = useNotifications();

const { t } = useI18n();

const title = t('login.seoTitle');
const description = t('login.seoDescription');

useSeoMeta({
  title,
  description
});

function onGoogleRedirect(): void {
  const state = encodeState(path, OAuthProvider.GOOGLE);

  redirectToGoogle({ state });
}

function handleAuth(encodedState: string): void {
  const state = decodeState(encodedState);
  const code = query.code?.toString() ?? '';

  void navigateTo(state.redirectPath);

  switch (state.provider) {
    case OAuthProvider.GOOGLE:
      googleAuthLogin({ code }, {
        onError: (err) => {
          notifications.addError(err?.message ?? 'Error logging in with Google.');
        },
        onSuccess: () => {
          /** @description must refresh as cookies are not reactive by default */
          refreshCookie('jwt')
          sendPlausibleEvent(PlausibleEventName.LOGGED_IN_GOOGLE);
          void navigateTo('/');
        }
      });
      break;
  }
}

onMounted(() => {
  if (typeof query?.state === 'string') {
    handleAuth(query.state);
  }
});
</script>
