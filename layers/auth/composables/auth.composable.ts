export function useAuthLogout(): void {
  const localePath = useLocalePath();
  const jwt = useCookie('jwt');

  jwt.value = null;

  window.location.href = localePath('/');
}
