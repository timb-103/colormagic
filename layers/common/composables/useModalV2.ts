import type { UnwrapRef } from '@vue/runtime-dom';

export interface UseModalResult<T> {
  isOpen: Ref<boolean>
  data: Ref<UnwrapRef<T | undefined>>
  open: (newData?: UnwrapRef<T>) => void
  close: VoidFunction
}

export default function useModalV2<T>(initialValues?: { isOpen?: boolean, data?: T }): UseModalResult<T> {
  const isOpen = ref(initialValues?.isOpen ?? false);
  const data = ref<T | undefined>(initialValues?.data);

  return {
    isOpen,
    // @ts-expect-error: dunno what this is
    data,
    open: (newData?: UnwrapRef<T>) => {
      data.value = newData;
      isOpen.value = true;
    },
    close: () => {
      isOpen.value = false;
    }
  };
}
