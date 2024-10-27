export interface PaletteFilter {
  id: string
  label: {
    en: string
    ja: string
    it: string
  }
  palette: string[]
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
    { id: 'amber', label: { en: 'Amber', ja: 'アンバー', it: 'Ambra' }, palette: ['#FFBF00', '#FFB300', '#FF8C00', '#FF6600', '#FF4500'] },
    { id: 'aqua', label: { en: 'Aqua', ja: 'アクア', it: 'Acqua' }, palette: ['#00FFFF', '#00E5EE', '#00CED1', '#20B2AA', '#008B8B'] },
    { id: 'apricot', label: { en: 'Apricot', ja: 'アプリコット', it: 'Albicocca' }, palette: ['#FBCEB1', '#FBC0A3', '#F8B293', '#F7A283', '#F69373'] },
    { id: 'auburn', label: { en: 'Auburn', ja: '赤褐色', it: 'Auburn' }, palette: ['#A52A2A', '#8B0000', '#7E1E1E', '#6A1616', '#551212'] },
    { id: 'beige', label: { en: 'Beige', ja: 'ベージュ', it: 'Beige' }, palette: ['#F5F5DC', '#ECE8D0', '#E5DFC7', '#DED5BC', '#D7CCB3'] },
    { id: 'black', label: { en: 'Black', ja: '黒', it: 'Nero' }, palette: ['#000000', '#0A0A0A', '#141414', '#1F1F1F', '#2A2A2A'] },
    { id: 'blue', label: { en: 'Blue', ja: '青', it: 'Blu' }, palette: ['#0000FF', '#0000CD', '#00008B', '#4169E1', '#4682B4'] },
    { id: 'brown', label: { en: 'Brown', ja: '茶色', it: 'Marrone' }, palette: ['#964B00', '#8B4513', '#A52A2A', '#7B3F00', '#603311'] },
    { id: 'burgundy', label: { en: 'Burgundy', ja: 'バーガンディ', it: 'Borgogna' }, palette: ['#800020', '#66001E', '#4D001A', '#330015', '#1A000F'] },
    { id: 'coral', label: { en: 'Coral', ja: 'コーラル', it: 'Corallo' }, palette: ['#FF7F50', '#FF6347', '#FF4500', '#FF7256', '#FFA07A'] },
    { id: 'cream', label: { en: 'Cream', ja: 'クリーム', it: 'Crema' }, palette: ['#FFFDD0', '#FFFACD', '#FAF0E6', '#F5DEB3', '#FFE4B5'] },
    { id: 'crimson', label: { en: 'Crimson', ja: 'クリムゾン', it: 'Cremisi' }, palette: ['#DC143C', '#B22222', '#A52A2A', '#8B0000', '#800000'] },
    { id: 'fuschia', label: { en: 'Fuschia', ja: 'フクシア', it: 'Fucsia' }, palette: ['#FF00FF', '#FF77FF', '#FF44FF', '#FF99FF', '#FF66CC'] },
    { id: 'gold', label: { en: 'Gold', ja: 'ゴールド', it: 'Oro' }, palette: ['#FFD700', '#FFC700', '#FFB800', '#FFA700', '#FF9600'] },
    { id: 'gray', label: { en: 'Gray', ja: '灰色', it: 'Grigio' }, palette: ['#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC'] },
    { id: 'green', label: { en: 'Green', ja: '緑', it: 'Verde' }, palette: ['#008000', '#006400', '#32CD32', '#228B22', '#2E8B57'] },
    { id: 'hazel', label: { en: 'Hazel', ja: 'ヘーゼル', it: 'Nocciola' }, palette: ['#8E7618', '#9C8542', '#A58E5F', '#B29A7F', '#C2A592'] },
    { id: 'indigo', label: { en: 'Indigo', ja: 'インディゴ', it: 'Indaco' }, palette: ['#4B0082', '#3C006A', '#330057', '#260046', '#1A0033'] },
    { id: 'ivory', label: { en: 'Ivory', ja: 'アイボリー', it: 'Avorio' }, palette: ['#FFFFF0', '#FFFFE0', '#FAFAD2', '#FFEFD5', '#FFF5EE'] },
    { id: 'lavender', label: { en: 'Lavender', ja: 'ラベンダー', it: 'Lavanda' }, palette: ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#BA55D3'] },
    { id: 'lilac', label: { en: 'Lilac', ja: 'ライラック', it: 'Lillà' }, palette: ['#C8A2C8', '#D1B2D1', '#DAAEDC', '#E5BBE8', '#F2C6F3'] },
    { id: 'magenta', label: { en: 'Magenta', ja: 'マゼンタ', it: 'Magenta' }, palette: ['#FF00FF', '#FF77FF', '#FF44FF', '#FF99FF', '#FF66CC'] },
    { id: 'maroon', label: { en: 'Maroon', ja: '栗色', it: 'Bordeaux' }, palette: ['#800000', '#5C0000', '#3C0000', '#4E0505', '#720707'] },
    { id: 'mint', label: { en: 'Mint', ja: 'ミント', it: 'Menta' }, palette: ['#98FF98', '#90EE90', '#8FBC8F', '#98FB98', '#66CDAA'] },
    { id: 'orange', label: { en: 'Orange', ja: 'オレンジ', it: 'Arancio' }, palette: ['#FFA500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500'] },
    { id: 'peach', label: { en: 'Peach', ja: 'ピーチ', it: 'Pesca' }, palette: ['#FFDAB9', '#FFE4B5', '#FFDEAD', '#F5DEB3', '#FAF0E6'] },
    { id: 'pink', label: { en: 'Pink', ja: 'ピンク', it: 'Rosa' }, palette: ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#FF6EB4'] },
    { id: 'purple', label: { en: 'Purple', ja: '紫', it: 'Viola' }, palette: ['#800080', '#6A0DAD', '#9400D3', '#8A2BE2', '#9370DB'] },
    { id: 'red', label: { en: 'Red', ja: '赤', it: 'Rosso' }, palette: ['#FF0000', '#DC143C', '#B22222', '#CD5C5C', '#E9967A'] },
    { id: 'sage', label: { en: 'Sage', ja: 'セージ', it: 'Salvia' }, palette: ['#BCB88A', '#B2AC75', '#A9A26B', '#9F9760', '#8E8B4E'] },
    { id: 'tan', label: { en: 'Tan', ja: 'タン', it: 'Tan' }, palette: ['#D2B48C', '#D4A017', '#C19A6B', '#C3B091', '#DEB887'] },
    { id: 'teal', label: { en: 'Teal', ja: 'ティール', it: 'Verde acqua' }, palette: ['#008080', '#009688', '#20B2AA', '#48D1CC', '#40E0D0'] },
    { id: 'turquoise', label: { en: 'Turquoise', ja: 'ターコイズ', it: 'Turchese' }, palette: ['#40E0D0', '#48D1CC', '#00CED1', '#20B2AA', '#5F9EA0'] },
    { id: 'violet', label: { en: 'Violet', ja: 'スミレ', it: 'Viola' }, palette: ['#EE82EE', '#DA70D6', '#DDA0DD', '#E6E6FA', '#BA55D3'] },
    { id: 'white', label: { en: 'White', ja: '白', it: 'Bianco' }, palette: ['#FFFFFF', '#F8F8FF', '#F5F5F5', '#F0F0F0', '#FAFAFA'] },
    { id: 'yellow', label: { en: 'Yellow', ja: '黄色', it: 'Giallo' }, palette: ['#FFFF00', '#FFD700', '#FFA500', '#FFAE42', '#FFE135'] }
  ].sort((a, b) => a.id.localeCompare(b.id));
}

export function getPaletteToneFilter(): PaletteFilter[] {
  return [
    { id: 'warm', label: { en: 'Warm', ja: 'ウォーム', it: 'Caldo' }, palette: ['#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FFD700'] },
    { id: 'cool', label: { en: 'Cool', ja: 'クール', it: 'Fresco' }, palette: ['#4682B4', '#5F9EA0', '#6495ED', '#00CED1', '#20B2AA'] },
    { id: 'earthy', label: { en: 'Earthy', ja: 'アーシー', it: 'Terroso' }, palette: ['#8B4513', '#A0522D', '#6B4226', '#D2B48C', '#C19A6B'] },
    { id: 'pastel', label: { en: 'Pastel', ja: 'パステル', it: 'Pastello' }, palette: ['#FFB6C1', '#FFDAB9', '#E6E6FA', '#FFFACD', '#E0FFFF'] },
    { id: 'vibrant', label: { en: 'Vibrant', ja: 'ビビッド', it: 'Vivace' }, palette: ['#FF1493', '#FF4500', '#FF69B4', '#FF6347', '#FF7F50'] },
    { id: 'bright', label: { en: 'Bright', ja: 'ブライト', it: 'Brillante' }, palette: ['#FFD700', '#FFAE42', '#FFA500', '#FF6347', '#FFD700'] },
    { id: 'dark', label: { en: 'Dark', ja: 'ダーク', it: 'Scuro' }, palette: ['#000000', '#2F4F4F', '#4B0082', '#1C1C1C', '#696969'] },
    { id: 'light', label: { en: 'Light', ja: 'ライト', it: 'Chiaro' }, palette: ['#F5F5DC', '#FAFAD2', '#FFFACD', '#FFFAF0', '#F8F8FF'] },
    { id: 'soft', label: { en: 'Soft', ja: 'ソフト', it: 'Morbido' }, palette: ['#FFE4E1', '#FFDEAD', '#FDF5E6', '#FAF0E6', '#FFEFD5'] },
    { id: 'rainbow', label: { en: 'Rainbow', ja: 'レインボー', it: 'Arcobaleno' }, palette: ['#FF4500', '#FFD700', '#00FF00', '#1E90FF', '#800080'] },
    { id: 'neutral', label: { en: 'Neutral', ja: 'ニュートラル', it: 'Neutro' }, palette: ['#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC'] },
    { id: 'muted', label: { en: 'Muted', ja: 'ミュート', it: 'Smutato' }, palette: ['#696969', '#708090', '#778899', '#2F4F4F', '#A9A9A9'] },
    { id: 'monochromatic', label: { en: 'Monochromatic', ja: 'モノクローム', it: 'Monocromatico' }, palette: ['#2F4F4F', '#696969', '#808080', '#A9A9A9', '#C0C0C0'] },
    { id: 'deep', label: { en: 'Deep', ja: 'ディープ', it: 'Profondo' }, palette: ['#4B0082', '#6A0DAD', '#800080', '#8B0000', '#000080'] },
    { id: 'high-contrast', label: { en: 'High Contrast', ja: 'ハイコントラスト', it: 'Alto Contrasto' }, palette: ['#FFFFFF', '#000000', '#FFD700', '#FF4500', '#1E90FF'] }
  ].sort((a, b) => a.id.localeCompare(b.id));
}

export function getPaletteStyleFilter(): PaletteFilter[] {
  return [
    { id: 'boho', label: { en: 'Boho', ja: 'ボヘミアン', it: 'Boho' }, palette: ['#D2B48C', '#F4A460', '#DEB887', '#FFE4C4', '#D2691E'] },
    { id: '60s', label: { en: '60s', ja: '60年代', it: 'Anni 60' }, palette: ['#FF6347', '#FFD700', '#00FF00', '#4682B4', '#9400D3'] },
    { id: '70s', label: { en: '70s', ja: '70年代', it: 'Anni 70' }, palette: ['#DAA520', '#B8860B', '#FF8C00', '#A0522D', '#CD853F'] },
    { id: '80s', label: { en: '80s', ja: '80年代', it: 'Anni 80' }, palette: ['#FF69B4', '#FF1493', '#9400D3', '#00FFFF', '#FFD700'] },
    { id: '90s', label: { en: '90s', ja: '90年代', it: 'Anni 90' }, palette: ['#32CD32', '#00FA9A', '#ADFF2F', '#FFD700', '#FF4500'] },
    { id: 'y2k', label: { en: 'Y2K', ja: 'Y2K', it: 'Y2K' }, palette: ['#ADD8E6', '#00CED1', '#4682B4', '#87CEFA', '#5F9EA0'] },
    { id: 'retro', label: { en: 'Retro', ja: 'レトロ', it: 'Retrò' }, palette: ['#F08080', '#FF4500', '#FFD700', '#8B0000', '#00CED1'] },
    { id: 'sunset', label: { en: 'Sunset', ja: 'サンセット', it: 'Tramonto' }, palette: ['#FF4500', '#FF6347', '#FFD700', '#FF7F50', '#FFA500'] },
    { id: 'skin', label: { en: 'Skin', ja: 'スキン', it: 'Pelle' }, palette: ['#FFE4C4', '#F5DEB3', '#D2B48C', '#C19A6B', '#DEB887'] },
    { id: 'aesthetic', label: { en: 'Aesthetic', ja: 'エステティック', it: 'Estetico' }, palette: ['#FFC0CB', '#FFB6C1', '#FF69B4', '#E6E6FA', '#D8BFD8'] },
    { id: 'vintage', label: { en: 'Vintage', ja: 'ビンテージ', it: 'Vintage' }, palette: ['#C0C0C0', '#A9A9A9', '#808080', '#696969', '#D3D3D3'] },
    { id: 'forest', label: { en: 'Forest', ja: 'フォレスト', it: 'Foresta' }, palette: ['#228B22', '#006400', '#32CD32', '#556B2F', '#8B4513'] },
    { id: 'fun', label: { en: 'Fun', ja: 'ファン', it: 'Divertente' }, palette: ['#FFD700', '#FF4500', '#FF6347', '#FF1493', '#32CD32'] },
    { id: 'minimalist', label: { en: 'Minimalist', ja: 'ミニマリスト', it: 'Minimalista' }, palette: ['#F5F5F5', '#D3D3D3', '#A9A9A9', '#808080', '#F8F8F8'] },
    { id: 'feminine', label: { en: 'Feminine', ja: 'フェミニン', it: 'Femminile' }, palette: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FFDAB9', '#F4A460'] },
    { id: 'royal', label: { en: 'Royal', ja: 'ロイヤル', it: 'Reale' }, palette: ['#4169E1', '#4682B4', '#000080', '#6A5ACD', '#B0C4DE'] },
    { id: 'wine', label: { en: 'Wine', ja: 'ワイン', it: 'Vino' }, palette: ['#722F37', '#800000', '#8B0000', '#A52A2A', '#B22222'] },
    { id: 'beach', label: { en: 'Beach', ja: 'ビーチ', it: 'Spiaggia' }, palette: ['#87CEFA', '#00CED1', '#4682B4', '#ADD8E6', '#5F9EA0'] },
    { id: 'desert', label: { en: 'Desert', ja: '砂漠', it: 'Deserto' }, palette: ['#EDC9AF', '#F4A460', '#DEB887', '#D2B48C', '#C19A6B'] },
    { id: 'tropical', label: { en: 'Tropical', ja: 'トロピカル', it: 'Tropicale' }, palette: ['#FF7F50', '#FFA07A', '#FFD700', '#ADFF2F', '#00FF7F'] },
    { id: 'modern', label: { en: 'Modern', ja: 'モダン', it: 'Moderno' }, palette: ['#A9A9A9', '#808080', '#696969', '#D3D3D3', '#B0C4DE'] },
    { id: 'ocean', label: { en: 'Ocean', ja: 'オーシャン', it: 'Oceano' }, palette: ['#4682B4', '#87CEFA', '#00CED1', '#5F9EA0', '#000080'] },
    { id: 'cyberpunk', label: { en: 'Cyberpunk', ja: 'サイバーパンク', it: 'Cyberpunk' }, palette: ['#9400D3', '#FF00FF', '#8A2BE2', '#7B68EE', '#DA70D6'] },
    { id: 'space', label: { en: 'Space', ja: 'スペース', it: 'Spazio' }, palette: ['#000080', '#191970', '#4682B4', '#2F4F4F', '#6A5ACD'] },
    { id: 'nature', label: { en: 'Nature', ja: 'ネイチャー', it: 'Natura' }, palette: ['#6B8E23', '#228B22', '#556B2F', '#8B4513', '#006400'] },
    { id: 'coastal', label: { en: 'Coastal', ja: 'コースタル', it: 'Costiero' }, palette: ['#B0C4DE', '#ADD8E6', '#4682B4', '#5F9EA0', '#87CEFA'] },
    { id: 'luxury', label: { en: 'Luxury', ja: 'ラグジュアリー', it: 'Lusso' }, palette: ['#B8860B', '#DAA520', '#FFD700', '#F4A460', '#DEB887'] },
    { id: 'fire', label: { en: 'Fire', ja: 'ファイア', it: 'Fuoco' }, palette: ['#FF4500', '#FF6347', '#FFD700', '#FFA07A', '#FF8C00'] },
    { id: 'rustic', label: { en: 'Rustic', ja: 'ラスティック', it: 'Rustico' }, palette: ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#D2B48C'] },
    { id: 'moon', label: { en: 'Moon', ja: 'ムーン', it: 'Luna' }, palette: ['#F8F8FF', '#F0F8FF', '#E6E6FA', '#ADD8E6', '#708090'] },
    { id: 'hippie', label: { en: 'Hippie', ja: 'ヒッピー', it: 'Hippie' }, palette: ['#FF4500', '#FFD700', '#FF6347', '#FF69B4', '#00FF7F'] },
    { id: 'psychedelic', label: { en: 'Psychedelic', ja: 'サイケデリック', it: 'Psichedelico' }, palette: ['#FF00FF', '#9400D3', '#FF1493', '#FFD700', '#00FFFF'] },
    { id: 'flower', label: { en: 'Flower', ja: 'フラワー', it: 'Fiore' }, palette: ['#FF69B4', '#FFC0CB', '#FFD700', '#FFB6C1', '#FFA07A'] },
    { id: 'masculine', label: { en: 'Masculine', ja: 'マスキュリン', it: 'Maschile' }, palette: ['#2F4F4F', '#696969', '#808080', '#A9A9A9', '#000000'] },
    { id: 'mountain', label: { en: 'Mountain', ja: 'マウンテン', it: 'Montagna' }, palette: ['#2E8B57', '#006400', '#228B22', '#556B2F', '#8B4513'] },
    { id: 'midnight', label: { en: 'Midnight', ja: 'ミッドナイト', it: 'Mezzanotte' }, palette: ['#191970', '#000080', '#4682B4', '#2F4F4F', '#6A5ACD'] },
    { id: 'Scandinavian', label: { en: 'Scandinavian', ja: 'スカンジナビア', it: 'Scandinavo' }, palette: ['#D3D3D3', '#A9A9A9', '#808080', '#F5F5F5', '#696969'] },
    { id: 'wood', label: { en: 'Wood', ja: 'ウッド', it: 'Legno' }, palette: ['#8B4513', '#A0522D', '#D2691E', '#DEB887', '#F4A460'] },
    { id: 'garden', label: { en: 'Garden', ja: 'ガーデン', it: 'Giardino' }, palette: ['#228B22', '#32CD32', '#006400', '#556B2F', '#8B4513'] },
    { id: 'elegant', label: { en: 'Elegant', ja: 'エレガント', it: 'Elegante' }, palette: ['#DAA520', '#B8860B', '#FFD700', '#D2B48C', '#F4A460'] },
    { id: 'cat', label: { en: 'Cat', ja: 'キャット', it: 'Gatto' }, palette: ['#C0C0C0', '#A9A9A9', '#808080', '#696969', '#D3D3D3'] },
    { id: 'metal', label: { en: 'Metal', ja: 'メタル', it: 'Metallo' }, palette: ['#808080', '#696969', '#A9A9A9', '#C0C0C0', '#D3D3D3'] },
    { id: 'sun', label: { en: 'Sun', ja: 'サン', it: 'Sole' }, palette: ['#FFD700', '#FF8C00', '#FFA500', '#FF4500', '#FFD700'] },
    { id: 'medieval', label: { en: 'Medieval', ja: '中世', it: 'Medievale' }, palette: ['#A52A2A', '#8B4513', '#DAA520', '#DEB887', '#CD853F'] },
    { id: 'sunflower', label: { en: 'Sunflower', ja: 'ヒマワリ', it: 'Girasole' }, palette: ['#FFD700', '#FFA500', '#FF6347', '#FF8C00', '#DAA520'] },
    { id: 'japanese', label: { en: 'Japanese', ja: '日本', it: 'Giapponese' }, palette: ['#DC143C', '#FF4500', '#FF6347', '#FFD700', '#8B0000'] },
    { id: 'hawaii', label: { en: 'Hawaii', ja: 'ハワイ', it: 'Hawaii' }, palette: ['#FF6347', '#FFD700', '#FF7F50', '#00FF7F', '#4682B4'] },
    { id: 'night-sky', label: { en: 'Night Sky', ja: 'ナイトスカイ', it: 'Cielo Notturno' }, palette: ['#191970', '#000080', '#4682B4', '#2F4F4F', '#6A5ACD'] },
    { id: 'zombie', label: { en: 'Zombie', ja: 'ゾンビ', it: 'Zombie' }, palette: ['#708090', '#A9A9A9', '#808080', '#696969', '#2F4F4F'] }
  ].sort((a, b) => a.id.localeCompare(b.id));
}

export function getPaletteSeasonFilter(): PaletteFilter[] {
  return [
    { id: 'winter', label: { en: 'Winter', ja: 'ウィンター', it: 'Inverno' }, palette: ['#00BFFF', '#4682B4', '#191970', '#F8F8FF', '#DCDCDC'] },
    { id: 'fall', label: { en: 'Fall', ja: 'フォール', it: 'Autunno' }, palette: ['#D2691E', '#A0522D', '#CD853F', '#8B4513', '#FF8C00'] },
    { id: 'autumn', label: { en: 'Autumn', ja: 'オータム', it: 'Autunno' }, palette: ['#FF8C00', '#D2691E', '#CD853F', '#A0522D', '#8B4513'] },
    { id: 'spring', label: { en: 'Spring', ja: 'スプリング', it: 'Primavera' }, palette: ['#00FF7F', '#FFD700', '#FFB6C1', '#FF69B4', '#ADFF2F'] },
    { id: 'summer', label: { en: 'Summer', ja: 'サマー', it: 'Estate' }, palette: ['#FFD700', '#FFA07A', '#00BFFF', '#4682B4', '#87CEEB'] }
  ].sort((a, b) => a.id.localeCompare(b.id));
}
