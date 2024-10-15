export function formatOgUrl(colors: [string, string, string, string, string], text: string): string {
  return `/api/og/get?colors=${colors.join(':').replace(/#/g, '')}&text=${text}`;
}
