export function formatOgUrl(colors: string[], text: string): string {
  return `/api/image?colors=${colors.join(':').replace(/#/g, '')}&text=${encodeURIComponent(text)}`;
}

export function escapeSvgText(unsafe: string): string {
  return unsafe.replace(/[<>&"]/g, (char: string): string => {
    switch (char) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      default: return char;
    }
  });
}
