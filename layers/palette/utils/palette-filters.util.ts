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
    { id: 'amber', label: { en: 'Amber', ja: 'アンバー', it: 'Ambra' }, hex: '#FFBF00' },
    { id: 'auburn', label: { en: 'Auburn', ja: '赤褐色', it: 'Auburn' }, hex: '#A52A2A' },
    { id: 'beige', label: { en: 'Beige', ja: 'ベージュ', it: 'Beige' }, hex: '#F5F5DC' },
    { id: 'black', label: { en: 'Black', ja: '黒', it: 'Nero' }, hex: '#000000' },
    { id: 'blue', label: { en: 'Blue', ja: '青', it: 'Blu' }, hex: '#0000FF' },
    { id: 'burgundy', label: { en: 'Burgundy', ja: 'バーガンディ', it: 'Borgogna' }, hex: '#800020' },
    { id: 'coral', label: { en: 'Coral', ja: 'コーラル', it: 'Corallo' }, hex: '#FF7F50' },
    { id: 'cream', label: { en: 'Cream', ja: 'クリーム', it: 'Crema' }, hex: '#FFFDD0' },
    { id: 'fuschia', label: { en: 'Fuschia', ja: 'フクシア', it: 'Fucsia' }, hex: '#FF00FF' },
    { id: 'gold', label: { en: 'Gold', ja: 'ゴールド', it: 'Oro' }, hex: '#FFD700' },
    { id: 'hazel', label: { en: 'Hazel', ja: 'ヘーゼル', it: 'Nocciola' }, hex: '#8E7618' },
    { id: 'indigo', label: { en: 'Indigo', ja: 'インディゴ', it: 'Indaco' }, hex: '#4B0082' },
    { id: 'ivory', label: { en: 'Ivory', ja: 'アイボリー', it: 'Avorio' }, hex: '#FFFFF0' },
    { id: 'lavender', label: { en: 'Lavender', ja: 'ラベンダー', it: 'Lavanda' }, hex: '#E6E6FA' },
    { id: 'lilac', label: { en: 'Lilac', ja: 'ライラック', it: 'Lillà' }, hex: '#C8A2C8' },
    { id: 'magenta', label: { en: 'Magenta', ja: 'マゼンタ', it: 'Magenta' }, hex: '#FF00FF' },
    { id: 'maroon', label: { en: 'Maroon', ja: '栗色', it: 'Bordeaux' }, hex: '#800000' },
    { id: 'peach', label: { en: 'Peach', ja: 'ピーチ', it: 'Pesca' }, hex: '#FFDAB9' },
    { id: 'pink', label: { en: 'Pink', ja: 'ピンク', it: 'Rosa' }, hex: '#FFC0CB' },
    { id: 'purple', label: { en: 'Purple', ja: '紫', it: 'Viola' }, hex: '#800080' },
    { id: 'red', label: { en: 'Red', ja: '赤', it: 'Rosso' }, hex: '#FF0000' },
    { id: 'sage', label: { en: 'Sage', ja: 'セージ', it: 'Salvia' }, hex: '#BCB88A' },
    { id: 'tan', label: { en: 'Tan', ja: 'タン', it: 'Tan' }, hex: '#D2B48C' },
    { id: 'teal', label: { en: 'Teal', ja: 'ティール', it: 'Verde acqua' }, hex: '#008080' },
    { id: 'turquoise', label: { en: 'Turquoise', ja: 'ターコイズ', it: 'Turchese' }, hex: '#40E0D0' },
    { id: 'white', label: { en: 'White', ja: '白', it: 'Bianco' }, hex: '#FFFFFF' }
  ];
}
