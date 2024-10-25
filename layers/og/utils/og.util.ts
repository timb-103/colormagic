export function formatOgUrl(colors: string[], text: string): string {
  return `/api/og?colors=${colors.join(':').replace(/#/g, '')}&text=${text}`;
}
