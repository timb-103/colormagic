const ja = [
  'お花見',
  '森林',
  '夕暮れ',
  'ソーダ',
  '紅葉',
  'ネオン風',
  'クリスマス',
  'ビーチ',
  'フルーツ',
  'キュート',
  'ひまわり',
  'ロマンティック',
  'エレガント',
  'お花畑',
  '水族館',
  'スポーティー',
  'ハッピー',
  '日本の着物',
  'カフェ',
  'さわやかな夏'
];

const en = [
  'Forest',
  'Ocean',
  'Beach',
  'Summer',
  'Cute',
  'Romantic',
  'Elegant',
  'Sporty',
  'Happy',
  'Spring',
  'Cafe',
  'Aquarium',
  'Sunflower',
  'Campfire',
  'Flower',
  'Winter',
  'Neon',
  'Autumn',
  'Christmas',
  'Teenage'
];

export function getSamplePrompt(lang: string): string[] {
  if (lang === 'ja') {
    return ja;
  }
  return en;
};
