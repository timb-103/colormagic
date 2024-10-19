function luminance(r: number, g: number, b: number): number {
  const [red, green, blue] = [r, g, b].map(channel => {
    const srgb = channel / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
  });

  // calculate the luminance using the formula
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function calculateContrastRatio(rgb1: number[], rgb2: number[]): number {
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);

  // calculate contrast ratio
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}
