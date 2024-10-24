<template>
  <div>
    <!-- header-->
    <div class="mb-4">
      <!-- title -->
      <h1>
        Login
      </h1>

      <!-- description-->
      <p class="text-xl font-medium mb-4 max-w-xl">
        Get access to likes, favourites and more upcoming features by logging in to ColorMagic.
      </p>
    </div>

    <UButton
      icon="i-fa6-brands-google"
      color="primary"
      :loading="isGooglePending || isRedirectingToGoogle"
      size="xl"
      @click="onGoogleRedirect()"
    >
      Login with Google
    </UButton>

    <p class="text-xs italic mt-4">
      *We only store your Google email address & ID to verify your login.
    </p>
  </div>
</template>

<script setup lang="ts">
import { decodeState, OAuthProvider, encodeState } from '~/layers/auth/helpers/oauth.helper';

const { query, path } = useRoute();

const { mutate: googleAuthLogin, isPending: isGooglePending } = useGoogleAuthLogin();
const { mutate: redirectToGoogle, isPending: isRedirectingToGoogle } = useGoogleAuthRedirect();
const notifications = useNotifications();

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
