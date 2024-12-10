import { isModulesReady } from '~/layers/setup/server/utils/setup.util';

export default defineEventHandler(() => {
  if (!isModulesReady) {
    createError({ statusCode: 409, statusMessage: 'not ready' });
  }
});
