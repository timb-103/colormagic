export interface PaletteFilter {
  id: string
  label: {
    en: string
    ja: string
    it: string
  }
  hex: string
}

export function getPaletteColorFilter(): PaletteFilter[] {
  return [
    { id: 'red', label: { en: 'Red', ja: '赤', it: 'Rosso' }, hex: '#FF0000' },
    { id: 'orange', label: { en: 'Orange', ja: 'オレンジ', it: 'Arancione' }, hex: '#FFA500' },
    { id: 'yellow', label: { en: 'Yellow', ja: '黄色', it: 'Giallo' }, hex: '#FFFF00' },
    { id: 'green', label: { en: 'Green', ja: '緑', it: 'Verde' }, hex: '#008000' },
    { id: 'blue', label: { en: 'Blue', ja: '青', it: 'Blu' }, hex: '#0000FF' },
    { id: 'purple', label: { en: 'Purple', ja: '紫', it: 'Viola' }, hex: '#800080' },
    { id: 'pink', label: { en: 'Pink', ja: 'ピンク', it: 'Rosa' }, hex: '#FFC0CB' },
    { id: 'brown', label: { en: 'Brown', ja: '茶色', it: 'Marrone' }, hex: '#A52A2A' },
    { id: 'black', label: { en: 'Black', ja: '黒', it: 'Nero' }, hex: '#000000' },
    { id: 'white', label: { en: 'White', ja: '白', it: 'Bianco' }, hex: '#FFFFFF' },
    { id: 'gray', label: { en: 'Gray', ja: '灰色', it: 'Grigio' }, hex: '#808080' },
    { id: 'teal', label: { en: 'Teal', ja: 'ティール', it: 'Verde acqua' }, hex: '#008080' },
    { id: 'indigo', label: { en: 'Indigo', ja: 'インディゴ', it: 'Indaco' }, hex: '#4B0082' },
    { id: 'violet', label: { en: 'Violet', ja: 'すみれ色', it: 'Violetta' }, hex: '#EE82EE' },
    { id: 'cyan', label: { en: 'Cyan', ja: 'シアン', it: 'Ciano' }, hex: '#00FFFF' },
    { id: 'magenta', label: { en: 'Magenta', ja: 'マゼンタ', it: 'Magenta' }, hex: '#FF00FF' },
    { id: 'gold', label: { en: 'Gold', ja: 'ゴールド', it: 'Oro' }, hex: '#FFD700' },
    { id: 'silver', label: { en: 'Silver', ja: 'シルバー', it: 'Argento' }, hex: '#C0C0C0' },
    { id: 'maroon', label: { en: 'Maroon', ja: '栗色', it: 'Bordeaux' }, hex: '#800000' },
    { id: 'navy', label: { en: 'Navy', ja: '紺色', it: 'Blu marino' }, hex: '#000080' }
  ];
}
