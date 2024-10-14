import { hexToRgb, rgbToHex, rgbToHsb, hsbToRgb, rgbToHsl, hslToRgb } from './color-converter.util';

export interface ColorArrange {
  brightness: number
  saturation: number
  warmth: number
}

export const defaultColor: ColorArrange = {
  brightness: 0,
  saturation: 0,
  warmth: 0
};

export function arrangeColors(colors: string[], arrange: ColorArrange | undefined): string[] {
  return colors.map((color) => {
    const bColor = changeBrightness(color, arrange?.brightness ?? 0);
    const sColor = changeSaturation(bColor, arrange?.saturation ?? 0);
    const wColor = changeWarmth(sColor, arrange?.warmth ?? 0, colors);
    return wColor;
  });
};

export const changeBrightness = (color: string, brightness: number): string => {
  const absBrightness = Math.abs(brightness);
  return brendColor(color, brightness >= 0 ? '#ffffff' : '#000000', absBrightness);
};

export const brendColor = (color1: string, color2: string, ratio: number): string => {
  const rgbColors = [hexToRgb(color1), hexToRgb(color2)];
  const hsvColors = [rgbToHsb(rgbColors[0]), rgbToHsb(rgbColors[1])];
  const fixedColors = [hsvColors[0], hsvColors[1]];
  if (fixedColors[0].s === 0) {
    fixedColors[0].h = fixedColors[1].h;
  }
  if (fixedColors[1].s === 0) {
    fixedColors[1].h = fixedColors[0].h;
  }
  if (fixedColors[0].b === 0) {
    fixedColors[0].s = 100;
  }
  if (fixedColors[1].b === 0) {
    fixedColors[1].s = 100;
  }
  const blendHsv = {
    h: blendValue(fixedColors[0].h, fixedColors[1].h, ratio),
    s: blendValue(fixedColors[0].s, fixedColors[1].s, ratio),
    b: blendValue(fixedColors[0].b, fixedColors[1].b, ratio)
  };
  const blendRgb = hsbToRgb(blendHsv);
  return rgbToHex(blendRgb);
};

const blendValue = (value1: number, value2: number, ratio: number): number => {
  return (value1 * (100 - ratio) + value2 * ratio) * 0.01;
};

export const changeSaturation = (color: string, saturation: number): string => {
  const rgbColor = hexToRgb(color);
  const hsvColor = rgbToHsl(rgbColor);
  const newSatColor = {
    h: hsvColor.h,
    s: hsvColor.s + (saturation > 0 ? 100 - hsvColor.s : hsvColor.s - 0) * saturation * 0.01,
    l: hsvColor.l
  };
  const newHexColor = rgbToHex(hslToRgb(newSatColor));
  return newHexColor;
};

export const changeWarmth = (color: string, warmth: number, colors: string[]): string => {
  const absWarmth = Math.abs(warmth);
  const rgbColors = colors.map((color) => hexToRgb(color));
  const hslColors = rgbColors.map((color) => rgbToHsl(color));
  const sAvg = hslColors.reduce((acc, color) => acc + color.s, 0) / hslColors.length;
  const lAvg = hslColors.reduce((acc, color) => acc + color.l, 0) / hslColors.length;
  const newCol = {
    h: warmth > 0 ? 20 : 220,
    s: sAvg,
    l: lAvg
  };

  return brendColorOverlay(color, rgbToHex(hslToRgb(newCol)), absWarmth);
};

export const brendColorOverlay = (color1: string, color2: string, ratio: number): string => {
  const rgbColor1 = hexToRgb(color1);
  const rgbColor2 = hexToRgb(color2);
  const ratioOne = ratio * 0.01;
  function blendRgbValue(value1: number, value2: number): number {
    const value =
      value1 < 128
        ? (2 * value2 * value1) / 255
        : 255 - (2 * (255 - value1) * (255 - value2)) / 255;
    return Math.round(Math.min(value * ratioOne + value1 * (1 - ratioOne), 255));
  };
  const newRgbColor = {
    r: blendRgbValue(rgbColor1.r, rgbColor2.r),
    g: blendRgbValue(rgbColor1.g, rgbColor2.g),
    b: blendRgbValue(rgbColor1.b, rgbColor2.b)
  };
  return rgbToHex(newRgbColor);
};
