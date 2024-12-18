export interface PaletteFilter {
  id: string
  palette: string[]
}

export function getAllPaletteFilters(): PaletteFilter[] {
  return [
    { id: 'amber', palette: ['#FFBF00', '#FFB300', '#FF8C00', '#FF6600', '#FF4500'] },
    { id: 'aqua', palette: ['#00FFFF', '#00E5EE', '#00CED1', '#20B2AA', '#008B8B'] },
    { id: 'apricot', palette: ['#FBCEB1', '#FBC0A3', '#F8B293', '#F7A283', '#F69373'] },
    { id: 'auburn', palette: ['#A52A2A', '#8B0000', '#7E1E1E', '#6A1616', '#551212'] },
    { id: 'beige', palette: ['#F5F5DC', '#ECE8D0', '#E5DFC7', '#DED5BC', '#D7CCB3'] },
    { id: 'black', palette: ['#000000', '#0A0A0A', '#141414', '#1F1F1F', '#2A2A2A'] },
    { id: 'blue', palette: ['#0000FF', '#0000CD', '#00008B', '#4169E1', '#4682B4'] },
    { id: 'brown', palette: ['#964B00', '#8B4513', '#A52A2A', '#7B3F00', '#603311'] },
    { id: 'burgundy', palette: ['#800020', '#66001E', '#4D001A', '#330015', '#1A000F'] },
    { id: 'coral', palette: ['#FF7F50', '#FF6347', '#FF4500', '#FF7256', '#FFA07A'] },
    { id: 'cream', palette: ['#FFFDD0', '#FFFACD', '#FAF0E6', '#F5DEB3', '#FFE4B5'] },
    { id: 'crimson', palette: ['#DC143C', '#B22222', '#A52A2A', '#8B0000', '#800000'] },
    { id: 'fuschia', palette: ['#FF00FF', '#FF77FF', '#FF44FF', '#FF99FF', '#FF66CC'] },
    { id: 'gold', palette: ['#FFD700', '#FFC700', '#FFB800', '#FFA700', '#FF9600'] },
    { id: 'gray', palette: ['#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC'] },
    { id: 'green', palette: ['#008000', '#006400', '#32CD32', '#228B22', '#2E8B57'] },
    { id: 'hazel', palette: ['#8E7618', '#9C8542', '#A58E5F', '#B29A7F', '#C2A592'] },
    { id: 'indigo', palette: ['#4B0082', '#3C006A', '#330057', '#260046', '#1A0033'] },
    { id: 'ivory', palette: ['#FFFFF0', '#FFFFE0', '#FAFAD2', '#FFEFD5', '#FFF5EE'] },
    { id: 'lavender', palette: ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#BA55D3'] },
    { id: 'lilac', palette: ['#C8A2C8', '#D1B2D1', '#DAAEDC', '#E5BBE8', '#F2C6F3'] },
    { id: 'magenta', palette: ['#FF00FF', '#FF77FF', '#FF44FF', '#FF99FF', '#FF66CC'] },
    { id: 'maroon', palette: ['#800000', '#5C0000', '#3C0000', '#4E0505', '#720707'] },
    { id: 'mint', palette: ['#98FF98', '#90EE90', '#8FBC8F', '#98FB98', '#66CDAA'] },
    { id: 'orange', palette: ['#FFA500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500'] },
    { id: 'peach', palette: ['#FFDAB9', '#FFE4B5', '#FFDEAD', '#F5DEB3', '#FAF0E6'] },
    { id: 'pink', palette: ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#FF6EB4'] },
    { id: 'plum', palette: ['#DDA0DD', '#9932CC', '#8B008B', '#D8BFD8', '#4B0082'] },
    { id: 'purple', palette: ['#800080', '#6A0DAD', '#9400D3', '#8A2BE2', '#9370DB'] },
    { id: 'red', palette: ['#FF0000', '#DC143C', '#B22222', '#CD5C5C', '#E9967A'] },
    { id: 'sage', palette: ['#BCB88A', '#B2AC75', '#A9A26B', '#9F9760', '#8E8B4E'] },
    { id: 'tan', palette: ['#D2B48C', '#D4A017', '#C19A6B', '#C3B091', '#DEB887'] },
    { id: 'teal', palette: ['#008080', '#009688', '#20B2AA', '#48D1CC', '#40E0D0'] },
    { id: 'turquoise', palette: ['#40E0D0', '#48D1CC', '#00CED1', '#20B2AA', '#5F9EA0'] },
    { id: 'violet', palette: ['#EE82EE', '#DA70D6', '#DDA0DD', '#E6E6FA', '#BA55D3'] },
    { id: 'white', palette: ['#FFFFFF', '#F8F8FF', '#F5F5F5', '#F0F0F0', '#FAFAFA'] },
    { id: 'yellow', palette: ['#FFFF00', '#FFD700', '#FFA500', '#FFAE42', '#FFE135'] },

    // tones
    { id: 'warm', palette: ['#FF7F50', '#FF6347', '#FF4500', '#FF8C00', '#FFD700'] },
    { id: 'cool', palette: ['#4682B4', '#5F9EA0', '#6495ED', '#00CED1', '#20B2AA'] },
    { id: 'earthy', palette: ['#8B4513', '#A0522D', '#6B4226', '#D2B48C', '#C19A6B'] },
    { id: 'pastel', palette: ['#FFB6C1', '#FFDAB9', '#E6E6FA', '#FFFACD', '#E0FFFF'] },
    { id: 'vibrant', palette: ['#FF1493', '#FF4500', '#FF69B4', '#FF6347', '#FF7F50'] },
    { id: 'bright', palette: ['#FFD700', '#FFAE42', '#FFA500', '#FF6347', '#FFD700'] },
    { id: 'dark', palette: ['#000000', '#2F4F4F', '#4B0082', '#1C1C1C', '#696969'] },
    { id: 'light', palette: ['#F5F5DC', '#FAFAD2', '#FFFACD', '#FFFAF0', '#F8F8FF'] },
    { id: 'soft', palette: ['#FFE4E1', '#FFDEAD', '#FDF5E6', '#FAF0E6', '#FFEFD5'] },
    { id: 'rainbow', palette: ['#FF4500', '#FFD700', '#00FF00', '#1E90FF', '#800080'] },
    { id: 'neutral', palette: ['#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC'] },
    { id: 'muted', palette: ['#696969', '#708090', '#778899', '#2F4F4F', '#A9A9A9'] },
    { id: 'monochromatic', palette: ['#2F4F4F', '#696969', '#808080', '#A9A9A9', '#C0C0C0'] },
    { id: 'deep', palette: ['#4B0082', '#6A0DAD', '#800080', '#8B0000', '#000080'] },
    { id: 'high-contrast', palette: ['#FFFFFF', '#000000', '#FFD700', '#FF4500', '#1E90FF'] },
    // styles
    { id: 'boho', palette: ['#D2B48C', '#F4A460', '#DEB887', '#FFE4C4', '#D2691E'] },
    { id: '60s', palette: ['#FF6347', '#FFD700', '#00FF00', '#4682B4', '#9400D3'] },
    { id: '70s', palette: ['#DAA520', '#B8860B', '#FF8C00', '#A0522D', '#CD853F'] },
    { id: '80s', palette: ['#FF69B4', '#FF1493', '#9400D3', '#00FFFF', '#FFD700'] },
    { id: '90s', palette: ['#32CD32', '#00FA9A', '#ADFF2F', '#FFD700', '#FF4500'] },
    { id: 'y2k', palette: ['#ADD8E6', '#00CED1', '#4682B4', '#87CEFA', '#5F9EA0'] },
    { id: 'retro', palette: ['#F08080', '#FF4500', '#FFD700', '#8B0000', '#00CED1'] },
    { id: 'sunset', palette: ['#FF4500', '#FF6347', '#FFD700', '#FF7F50', '#FFA500'] },
    { id: 'skin', palette: ['#FFE4C4', '#F5DEB3', '#D2B48C', '#C19A6B', '#DEB887'] },
    { id: 'aesthetic', palette: ['#FFC0CB', '#FFB6C1', '#FF69B4', '#E6E6FA', '#D8BFD8'] },
    { id: 'vintage', palette: ['#C0C0C0', '#A9A9A9', '#808080', '#696969', '#D3D3D3'] },
    { id: 'forest', palette: ['#228B22', '#006400', '#32CD32', '#556B2F', '#8B4513'] },
    { id: 'fun', palette: ['#FFD700', '#FF4500', '#FF6347', '#FF1493', '#32CD32'] },
    { id: 'minimalist', palette: ['#F5F5F5', '#D3D3D3', '#A9A9A9', '#808080', '#F8F8F8'] },
    { id: 'feminine', palette: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FFDAB9', '#F4A460'] },
    { id: 'royal', palette: ['#4169E1', '#4682B4', '#000080', '#6A5ACD', '#B0C4DE'] },
    { id: 'wine', palette: ['#722F37', '#800000', '#8B0000', '#A52A2A', '#B22222'] },
    { id: 'beach', palette: ['#87CEFA', '#00CED1', '#4682B4', '#ADD8E6', '#5F9EA0'] },
    { id: 'desert', palette: ['#EDC9AF', '#F4A460', '#DEB887', '#D2B48C', '#C19A6B'] },
    { id: 'tropical', palette: ['#FF7F50', '#FFA07A', '#FFD700', '#ADFF2F', '#00FF7F'] },
    { id: 'modern', palette: ['#A9A9A9', '#808080', '#696969', '#D3D3D3', '#B0C4DE'] },
    { id: 'ocean', palette: ['#4682B4', '#87CEFA', '#00CED1', '#5F9EA0', '#000080'] },
    { id: 'cyberpunk', palette: ['#9400D3', '#FF00FF', '#8A2BE2', '#7B68EE', '#DA70D6'] },
    { id: 'space', palette: ['#000080', '#191970', '#4682B4', '#2F4F4F', '#6A5ACD'] },
    { id: 'nature', palette: ['#6B8E23', '#228B22', '#556B2F', '#8B4513', '#006400'] },
    { id: 'coastal', palette: ['#B0C4DE', '#ADD8E6', '#4682B4', '#5F9EA0', '#87CEFA'] },
    { id: 'luxury', palette: ['#B8860B', '#DAA520', '#FFD700', '#F4A460', '#DEB887'] },
    { id: 'fire', palette: ['#FF4500', '#FF6347', '#FFD700', '#FFA07A', '#FF8C00'] },
    { id: 'rustic', palette: ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#D2B48C'] },
    { id: 'moon', palette: ['#F8F8FF', '#F0F8FF', '#E6E6FA', '#ADD8E6', '#708090'] },
    { id: 'hippie', palette: ['#FF4500', '#FFD700', '#FF6347', '#FF69B4', '#00FF7F'] },
    { id: 'psychedelic', palette: ['#FF00FF', '#9400D3', '#FF1493', '#FFD700', '#00FFFF'] },
    { id: 'flower', palette: ['#FF69B4', '#FFC0CB', '#FFD700', '#FFB6C1', '#FFA07A'] },
    { id: 'masculine', palette: ['#2F4F4F', '#696969', '#808080', '#A9A9A9', '#000000'] },
    { id: 'mountain', palette: ['#2E8B57', '#006400', '#228B22', '#556B2F', '#8B4513'] },
    { id: 'midnight', palette: ['#191970', '#000080', '#4682B4', '#2F4F4F', '#6A5ACD'] },
    { id: 'scandinavian', palette: ['#D3D3D3', '#A9A9A9', '#808080', '#F5F5F5', '#696969'] },
    { id: 'wood', palette: ['#8B4513', '#A0522D', '#D2691E', '#DEB887', '#F4A460'] },
    { id: 'garden', palette: ['#228B22', '#32CD32', '#006400', '#556B2F', '#8B4513'] },
    { id: 'elegant', palette: ['#DAA520', '#B8860B', '#FFD700', '#D2B48C', '#F4A460'] },
    { id: 'cat', palette: ['#C0C0C0', '#A9A9A9', '#808080', '#696969', '#D3D3D3'] },
    { id: 'metal', palette: ['#808080', '#696969', '#A9A9A9', '#C0C0C0', '#D3D3D3'] },
    { id: 'sun', palette: ['#FFD700', '#FF8C00', '#FFA500', '#FF4500', '#FFD700'] },
    { id: 'medieval', palette: ['#A52A2A', '#8B4513', '#DAA520', '#DEB887', '#CD853F'] },
    { id: 'sunflower', palette: ['#FFD700', '#FFA500', '#FF6347', '#FF8C00', '#DAA520'] },
    { id: 'japanese', palette: ['#DC143C', '#FF4500', '#FF6347', '#FFD700', '#8B0000'] },
    { id: 'hawaii', palette: ['#FF6347', '#FFD700', '#FF7F50', '#00FF7F', '#4682B4'] },
    { id: 'night-sky', palette: ['#191970', '#000080', '#4682B4', '#2F4F4F', '#6A5ACD'] },
    { id: 'zombie', palette: ['#708090', '#A9A9A9', '#808080', '#696969', '#2F4F4F'] },
    // seasons
    { id: 'winter', palette: ['#00BFFF', '#4682B4', '#191970', '#F8F8FF', '#DCDCDC'] },
    { id: 'fall', palette: ['#D2691E', '#A0522D', '#CD853F', '#8B4513', '#FF8C00'] },
    { id: 'autumn', palette: ['#FF8C00', '#D2691E', '#CD853F', '#A0522D', '#8B4513'] },
    { id: 'spring', palette: ['#00FF7F', '#FFD700', '#FFB6C1', '#FF69B4', '#ADFF2F'] },
    { id: 'summer', palette: ['#FFD700', '#FFA07A', '#00BFFF', '#4682B4', '#87CEEB'] }
  ].sort((a, b) => a.id.localeCompare(b.id));
}

export function getPaletteCombos(): string[][] {
  return [
    ['soft', 'summer'],
    ['soft', 'winter'],

    ['deep', 'winter'],
    ['deep', 'autumn'],

    ['cool', 'winter'],
    ['cool', 'summer'],
    ['cool', 'autumn'],

    ['warm', 'spring'],
    ['warm', 'autumn'],
    ['warm', 'summer'],
    ['warm', 'fall'],

    ['dark', 'autumn'],
    ['dark', 'winter'],
    ['dark', 'summer'],

    ['light', 'spring'],
    ['light', 'summer'],
    ['light', 'autumn'],
    ['light', 'winter'],

    ['bright', 'spring'],
    ['bright', 'winter'],
    ['bright', 'autumn'],
    ['bright', 'summer'],

    ['muted', 'autumn']
  ];
}
