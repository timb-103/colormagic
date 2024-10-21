export interface PaletteFilter {
  id: string
  label: {
    en: string
    ja: string
    it: string
  }
  hex: string
}

export function getAllPaletteFilters(): PaletteFilter[] {
  return [
    ...getPaletteColorFilter(),
    ...getPaletteSeasonFilter(),
    ...getPaletteStyleFilter(),
    ...getPaletteToneFilter()
  ].sort((a, b) => a.id.localeCompare(b.id));
}

export function getPaletteColorFilter(): PaletteFilter[] {
  return [
    { id: 'amber', label: { en: 'Amber', ja: 'アンバー', it: 'Ambra' }, hex: '#FFBF00' },
    { id: 'aqua', label: { en: 'Aqua', ja: 'アクア', it: 'Acqua' }, hex: '#00FFFF' },
    { id: 'apricot', label: { en: 'Apricot', ja: 'アプリコット', it: 'Albicocca' }, hex: '#FBCEB1' },
    { id: 'auburn', label: { en: 'Auburn', ja: '赤褐色', it: 'Auburn' }, hex: '#A52A2A' },
    { id: 'beige', label: { en: 'Beige', ja: 'ベージュ', it: 'Beige' }, hex: '#F5F5DC' },
    { id: 'black', label: { en: 'Black', ja: '黒', it: 'Nero' }, hex: '#000000' },
    { id: 'blue', label: { en: 'Blue', ja: '青', it: 'Blu' }, hex: '#0000FF' },
    { id: 'brown', label: { en: 'Brown', ja: '茶色', it: 'Marrone' }, hex: '#964B00' },
    { id: 'burgundy', label: { en: 'Burgundy', ja: 'バーガンディ', it: 'Borgogna' }, hex: '#800020' },
    { id: 'coral', label: { en: 'Coral', ja: 'コーラル', it: 'Corallo' }, hex: '#FF7F50' },
    { id: 'cream', label: { en: 'Cream', ja: 'クリーム', it: 'Crema' }, hex: '#FFFDD0' },
    { id: 'crimson', label: { en: 'Crimson', ja: 'クリムゾン', it: 'Cremisi' }, hex: '#DC143C' },
    { id: 'fuschia', label: { en: 'Fuschia', ja: 'フクシア', it: 'Fucsia' }, hex: '#FF00FF' },
    { id: 'gold', label: { en: 'Gold', ja: 'ゴールド', it: 'Oro' }, hex: '#FFD700' },
    { id: 'gray', label: { en: 'Gray', ja: '灰色', it: 'Grigio' }, hex: '#808080' },
    { id: 'green', label: { en: 'Green', ja: '緑', it: 'Verde' }, hex: '#008000' },
    { id: 'hazel', label: { en: 'Hazel', ja: 'ヘーゼル', it: 'Nocciola' }, hex: '#8E7618' },
    { id: 'indigo', label: { en: 'Indigo', ja: 'インディゴ', it: 'Indaco' }, hex: '#4B0082' },
    { id: 'ivory', label: { en: 'Ivory', ja: 'アイボリー', it: 'Avorio' }, hex: '#FFFFF0' },
    { id: 'lavender', label: { en: 'Lavender', ja: 'ラベンダー', it: 'Lavanda' }, hex: '#E6E6FA' },
    { id: 'lilac', label: { en: 'Lilac', ja: 'ライラック', it: 'Lillà' }, hex: '#C8A2C8' },
    { id: 'magenta', label: { en: 'Magenta', ja: 'マゼンタ', it: 'Magenta' }, hex: '#FF00FF' },
    { id: 'maroon', label: { en: 'Maroon', ja: '栗色', it: 'Bordeaux' }, hex: '#800000' },
    { id: 'mint', label: { en: 'Mint', ja: 'ミント', it: 'Menta' }, hex: '#98FF98' },
    { id: 'peach', label: { en: 'Peach', ja: 'ピーチ', it: 'Pesca' }, hex: '#FFDAB9' },
    { id: 'pink', label: { en: 'Pink', ja: 'ピンク', it: 'Rosa' }, hex: '#FFC0CB' },
    { id: 'purple', label: { en: 'Purple', ja: '紫', it: 'Viola' }, hex: '#800080' },
    { id: 'red', label: { en: 'Red', ja: '赤', it: 'Rosso' }, hex: '#FF0000' },
    { id: 'sage', label: { en: 'Sage', ja: 'セージ', it: 'Salvia' }, hex: '#BCB88A' },
    { id: 'tan', label: { en: 'Tan', ja: 'タン', it: 'Tan' }, hex: '#D2B48C' },
    { id: 'teal', label: { en: 'Teal', ja: 'ティール', it: 'Verde acqua' }, hex: '#008080' },
    { id: 'turquoise', label: { en: 'Turquoise', ja: 'ターコイズ', it: 'Turchese' }, hex: '#40E0D0' },
    { id: 'violet', label: { en: 'Violet', ja: 'スミレ', it: 'Viola' }, hex: '#EE82EE' },
    { id: 'white', label: { en: 'White', ja: '白', it: 'Bianco' }, hex: '#FFFFFF' },
    { id: 'yellow', label: { en: 'Yellow', ja: '黄色', it: 'Giallo' }, hex: '#FFFF00' }
  ].sort((a, b) => a.id.localeCompare(b.id));
}

export function getPaletteToneFilter(): PaletteFilter[] {
  return [
    { id: 'warm', label: { en: 'Warm', ja: 'ウォーム', it: 'Caldo' }, hex: '#FF7F50' },
    { id: 'cool', label: { en: 'Cool', ja: 'クール', it: 'Fresco' }, hex: '#4682B4' },
    { id: 'earthy', label: { en: 'Earthy', ja: 'アーシー', it: 'Terroso' }, hex: '#8B4513' },
    { id: 'pastel', label: { en: 'Pastel', ja: 'パステル', it: 'Pastello' }, hex: '#FFB6C1' },
    { id: 'vibrant', label: { en: 'Vibrant', ja: 'ビビッド', it: 'Vivace' }, hex: '#FF1493' },
    { id: 'bright', label: { en: 'Bright', ja: 'ブライト', it: 'Brillante' }, hex: '#FFD700' },
    { id: 'dark', label: { en: 'Dark', ja: 'ダーク', it: 'Scuro' }, hex: '#000000' },
    { id: 'light', label: { en: 'Light', ja: 'ライト', it: 'Chiaro' }, hex: '#F5F5DC' },
    { id: 'soft', label: { en: 'Soft', ja: 'ソフト', it: 'Morbido' }, hex: '#FFE4E1' },
    { id: 'rainbow', label: { en: 'Rainbow', ja: 'レインボー', it: 'Arcobaleno' }, hex: '#FF4500' },
    { id: 'neutral', label: { en: 'Neutral', ja: 'ニュートラル', it: 'Neutro' }, hex: '#808080' },
    { id: 'muted', label: { en: 'Muted', ja: 'ミュート', it: 'Smutato' }, hex: '#696969' },
    { id: 'monochromatic', label: { en: 'Monochromatic', ja: 'モノクローム', it: 'Monocromatico' }, hex: '#2F4F4F' },
    { id: 'deep', label: { en: 'Deep', ja: 'ディープ', it: 'Profondo' }, hex: '#4B0082' },
    { id: 'high-contrast', label: { en: 'High Contrast', ja: 'ハイコントラスト', it: 'Alto Contrasto' }, hex: '#FFFFFF' }
  ].sort((a, b) => a.id.localeCompare(b.id));
}

export function getPaletteStyleFilter(): PaletteFilter[] {
  return [
    { id: 'boho', label: { en: 'Boho', ja: 'ボヘミアン', it: 'Boho' }, hex: '#D2B48C' },
    { id: '60s', label: { en: '60s', ja: '60年代', it: 'Anni 60' }, hex: '#FF6347' },
    { id: '70s', label: { en: '70s', ja: '70年代', it: 'Anni 70' }, hex: '#DAA520' },
    { id: '80s', label: { en: '80s', ja: '80年代', it: 'Anni 80' }, hex: '#FF69B4' },
    { id: '90s', label: { en: '90s', ja: '90年代', it: 'Anni 90' }, hex: '#32CD32' },
    { id: 'y2k', label: { en: 'Y2K', ja: 'Y2K', it: 'Y2K' }, hex: '#ADD8E6' },
    { id: 'retro', label: { en: 'Retro', ja: 'レトロ', it: 'Retrò' }, hex: '#F08080' },
    { id: 'sunset', label: { en: 'Sunset', ja: 'サンセット', it: 'Tramonto' }, hex: '#FF4500' },
    { id: 'skin', label: { en: 'Skin', ja: 'スキン', it: 'Pelle' }, hex: '#FFE4C4' },
    { id: 'aesthetic', label: { en: 'Aesthetic', ja: 'エステティック', it: 'Estetico' }, hex: '#FFC0CB' },
    { id: 'vintage', label: { en: 'Vintage', ja: 'ビンテージ', it: 'Vintage' }, hex: '#C0C0C0' },
    { id: 'forest', label: { en: 'Forest', ja: 'フォレスト', it: 'Foresta' }, hex: '#228B22' },
    { id: 'fun', label: { en: 'Fun', ja: 'ファン', it: 'Divertente' }, hex: '#FFD700' },
    { id: 'minimalist', label: { en: 'Minimalist', ja: 'ミニマリスト', it: 'Minimalista' }, hex: '#F5F5F5' },
    { id: 'feminine', label: { en: 'Feminine', ja: 'フェミニン', it: 'Femminile' }, hex: '#FFB6C1' },
    { id: 'royal', label: { en: 'Royal', ja: 'ロイヤル', it: 'Reale' }, hex: '#4169E1' },
    { id: 'wine', label: { en: 'Wine', ja: 'ワイン', it: 'Vino' }, hex: '#722F37' },
    { id: 'beach', label: { en: 'Beach', ja: 'ビーチ', it: 'Spiaggia' }, hex: '#87CEFA' },
    { id: 'desert', label: { en: 'Desert', ja: '砂漠', it: 'Deserto' }, hex: '#EDC9AF' },
    { id: 'tropical', label: { en: 'Tropical', ja: 'トロピカル', it: 'Tropicale' }, hex: '#FF7F50' },
    { id: 'modern', label: { en: 'Modern', ja: 'モダン', it: 'Moderno' }, hex: '#A9A9A9' },
    { id: 'ocean', label: { en: 'Ocean', ja: 'オーシャン', it: 'Oceano' }, hex: '#4682B4' },
    { id: 'cyberpunk', label: { en: 'Cyberpunk', ja: 'サイバーパンク', it: 'Cyberpunk' }, hex: '#9400D3' },
    { id: 'space', label: { en: 'Space', ja: 'スペース', it: 'Spazio' }, hex: '#000080' },
    { id: 'nature', label: { en: 'Nature', ja: 'ネイチャー', it: 'Natura' }, hex: '#6B8E23' },
    { id: 'coastal', label: { en: 'Coastal', ja: 'コースタル', it: 'Costiero' }, hex: '#B0C4DE' },
    { id: 'luxury', label: { en: 'Luxury', ja: 'ラグジュアリー', it: 'Lusso' }, hex: '#B8860B' },
    { id: 'fire', label: { en: 'Fire', ja: 'ファイア', it: 'Fuoco' }, hex: '#FF4500' },
    { id: 'rustic', label: { en: 'Rustic', ja: 'ラスティック', it: 'Rustico' }, hex: '#8B4513' },
    { id: 'moon', label: { en: 'Moon', ja: 'ムーン', it: 'Luna' }, hex: '#F8F8FF' },
    { id: 'hippie', label: { en: 'Hippie', ja: 'ヒッピー', it: 'Hippie' }, hex: '#FF4500' },
    { id: 'psychedelic', label: { en: 'Psychedelic', ja: 'サイケデリック', it: 'Psichedelico' }, hex: '#FF00FF' },
    { id: 'flower', label: { en: 'Flower', ja: 'フラワー', it: 'Fiore' }, hex: '#FF69B4' },
    { id: 'masculine', label: { en: 'Masculine', ja: 'マスキュリン', it: 'Maschile' }, hex: '#2F4F4F' },
    { id: 'mountain', label: { en: 'Mountain', ja: 'マウンテン', it: 'Montagna' }, hex: '#2E8B57' },
    { id: 'midnight', label: { en: 'Midnight', ja: 'ミッドナイト', it: 'Mezzanotte' }, hex: '#191970' },
    { id: 'Scandinavian', label: { en: 'Scandinavian', ja: 'スカンジナビア', it: 'Scandinavo' }, hex: '#D3D3D3' },
    { id: 'wood', label: { en: 'Wood', ja: 'ウッド', it: 'Legno' }, hex: '#8B4513' },
    { id: 'garden', label: { en: 'Garden', ja: 'ガーデン', it: 'Giardino' }, hex: '#228B22' },
    { id: 'elegant', label: { en: 'Elegant', ja: 'エレガント', it: 'Elegante' }, hex: '#DAA520' },
    { id: 'cat', label: { en: 'Cat', ja: 'キャット', it: 'Gatto' }, hex: '#C0C0C0' },
    { id: 'metal', label: { en: 'Metal', ja: 'メタル', it: 'Metallo' }, hex: '#808080' },
    { id: 'sun', label: { en: 'Sun', ja: 'サン', it: 'Sole' }, hex: '#FFD700' },
    { id: 'medieval', label: { en: 'Medieval', ja: '中世', it: 'Medievale' }, hex: '#A52A2A' },
    { id: 'sunflower', label: { en: 'Sunflower', ja: 'ヒマワリ', it: 'Girasole' }, hex: '#FFD700' },
    { id: 'japanese', label: { en: 'Japanese', ja: '日本', it: 'Giapponese' }, hex: '#DC143C' },
    { id: 'hawaii', label: { en: 'Hawaii', ja: 'ハワイ', it: 'Hawaii' }, hex: '#FF6347' },
    { id: 'night-sky', label: { en: 'Night Sky', ja: 'ナイトスカイ', it: 'Cielo Notturno' }, hex: '#191970' },
    { id: 'zombie', label: { en: 'Zombie', ja: 'ゾンビ', it: 'Zombie' }, hex: '#708090' }
  ].sort((a, b) => a.id.localeCompare(b.id));
}

export function getPaletteSeasonFilter(): PaletteFilter[] {
  return [
    { id: 'winter', label: { en: 'Winter', ja: 'ウィンター', it: 'Inverno' }, hex: '#00BFFF' },
    { id: 'fall', label: { en: 'Fall', ja: 'フォール', it: 'Autunno' }, hex: '#D2691E' },
    { id: 'autumn', label: { en: 'Autumn', ja: 'オータム', it: 'Autunno' }, hex: '#FF8C00' },
    { id: 'spring', label: { en: 'Spring', ja: 'スプリング', it: 'Primavera' }, hex: '#00FF7F' },
    { id: 'summer', label: { en: 'Summer', ja: 'サマー', it: 'Estate' }, hex: '#FFD700' },
    { id: 'deep-winter', label: { en: 'Deep Winter', ja: 'ディープウィンター', it: 'Inverno Profondo' }, hex: '#00008B' },
    { id: 'soft-summer', label: { en: 'Soft Summer', ja: 'ソフトサマー', it: 'Estate Morbida' }, hex: '#B0E0E6' },
    { id: 'deep-autumn', label: { en: 'Deep Autumn', ja: 'ディープオータム', it: 'Autunno Profondo' }, hex: '#8B4513' },
    { id: 'cool-winter', label: { en: 'Cool Winter', ja: 'クールウィンター', it: 'Inverno Freddo' }, hex: '#4682B4' },
    { id: 'cool-summer', label: { en: 'Cool Summer', ja: 'クールサマー', it: 'Estate Fresca' }, hex: '#87CEEB' },
    { id: 'warm-spring', label: { en: 'Warm Spring', ja: 'ウォームスプリング', it: 'Primavera Calda' }, hex: '#FFD700' },
    { id: 'warm-autumn', label: { en: 'Warm Autumn', ja: 'ウォームオータム', it: 'Autunno Caldo' }, hex: '#CD853F' },
    { id: 'dark-autumn', label: { en: 'Dark Autumn', ja: 'ダークオータム', it: 'Autunno Scuro' }, hex: '#8B0000' },
    { id: 'light-spring', label: { en: 'Light Spring', ja: 'ライトスプリング', it: 'Primavera Chiara' }, hex: '#FFB6C1' },
    { id: 'dark-winter', label: { en: 'Dark Winter', ja: 'ダークウィンター', it: 'Inverno Scuro' }, hex: '#191970' },
    { id: 'light-summer', label: { en: 'Light Summer', ja: 'ライトサマー', it: 'Estate Chiara' }, hex: '#F5F5DC' },
    { id: 'bright-spring', label: { en: 'Bright Spring', ja: 'ブライトスプリング', it: 'Primavera Brillante' }, hex: '#FF69B4' },
    { id: 'bright-winter', label: { en: 'Bright Winter', ja: 'ブライトウィンター', it: 'Inverno Brillante' }, hex: '#00CED1' },
    { id: 'clear-winter', label: { en: 'Clear Winter', ja: 'クリアウィンター', it: 'Inverno Limpido' }, hex: '#4682B4' },
    { id: 'clear-spring', label: { en: 'Clear Spring', ja: 'クリアスプリング', it: 'Primavera Limpida' }, hex: '#FFD700' },
    { id: 'warm-summer', label: { en: 'Warm Summer', ja: 'ウォームサマー', it: 'Estate Calda' }, hex: '#FFA07A' },
    { id: 'soft-winter', label: { en: 'Soft Winter', ja: 'ソフトウィンター', it: 'Inverno Morbido' }, hex: '#DCDCDC' },
    { id: 'cool-autumn', label: { en: 'Cool Autumn', ja: 'クールオータム', it: 'Autunno Fresco' }, hex: '#8B4513' },
    { id: 'warm-fall', label: { en: 'Warm Fall', ja: 'ウォームフォール', it: 'Autunno Caldo' }, hex: '#D2691E' },
    { id: 'cold-summer', label: { en: 'Cold Summer', ja: 'コールドサマー', it: 'Estate Fredda' }, hex: '#4682B4' },
    { id: 'light-autumn', label: { en: 'Light Autumn', ja: 'ライトオータム', it: 'Autunno Chiaro' }, hex: '#FFD700' },
    { id: 'dark-summer', label: { en: 'Dark Summer', ja: 'ダークサマー', it: 'Estate Scura' }, hex: '#8B0000' },
    { id: 'muted-autumn', label: { en: 'Muted Autumn', ja: 'ミュートオータム', it: 'Autunno Smorzato' }, hex: '#A0522D' },
    { id: 'bright-autumn', label: { en: 'Bright Autumn', ja: 'ブライトオータム', it: 'Autunno Brillante' }, hex: '#FFA500' },
    { id: 'light-winter', label: { en: 'Light Winter', ja: 'ライトウィンター', it: 'Inverno Chiaro' }, hex: '#F8F8FF' },
    { id: 'bright-summer', label: { en: 'Bright Summer', ja: 'ブライトサマー', it: 'Estate Brillante' }, hex: '#FF69B4' }
  ].sort((a, b) => a.id.localeCompare(b.id));
}
