export function getLocale(locale: string): 'en' | 'ja' | 'it' {
  if (locale === 'ja') {
    return 'ja';
  }
  if (locale === 'it') {
    return 'it';
  }
  return 'en';
}
