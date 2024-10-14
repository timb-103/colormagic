export const DEFAULT_NOTIFICATION_ERROR_TITLE = 'An error has occured';
export const DEFAULT_NOTIFICATION_WARN_TITLE = 'Warning';
export const DEFAULT_NOTIFICATION_SUCCESS_TITLE = 'Success';
export const NOTFICATION_INFINITE_TIMEOUT = 0;

export interface NotificationsResult {
  addError: (description: string, title?: string, timeout?: number) => void
  addWarning: (description: string, title?: string, timeout?: number) => void
  addSuccess: (description: string, title?: string, timeout?: number) => void
}

export default function useNotifications(): NotificationsResult {
  const toasts = useToast();

  return {
    addError: (description: string, title: string = DEFAULT_NOTIFICATION_ERROR_TITLE, timeout?: number) => {
      toasts.add({
        icon: 'i-heroicons-exclamation-circle',
        color: 'red',
        title,
        description,
        timeout
      });
    },
    addWarning: (description: string, title: string = DEFAULT_NOTIFICATION_WARN_TITLE, timeout?: number) => {
      toasts.add({
        icon: 'i-heroicons-exclamation-triangle',
        color: 'yellow',
        title,
        description,
        timeout
      });
    },
    addSuccess: (description: string, title: string = DEFAULT_NOTIFICATION_SUCCESS_TITLE, timeout?: number) => {
      toasts.add({
        icon: 'i-heroicons-check-circle',
        color: 'green',
        title,
        description,
        timeout
      });
    }
  };
}
