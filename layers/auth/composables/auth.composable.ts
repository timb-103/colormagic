export function useAuthLogout(): void {
  const jwt = useCookie('jwt');
  jwt.value = null;

  window.location.href = '/';
}
