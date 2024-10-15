import type { PaletteDto } from '../dtos/palette.dto';
import type { PaletteEntity } from '../entities/palette.entity';

export function mapPaletteEntityToDto(entity: PaletteEntity): PaletteDto {
  return {
    id: entity._id.toHexString(),
    colors: entity.colors,
    text: entity.text
  };
}

export function mapCreatePalettePrompt(prompt: string): string {
  let value = 'Generate a beautiful, bright color palette with 5 colors.';
  value += 'Align the tones. Avoid really close hues (can be a bit close). Eg. "sunset" would be #1e507b #4f6187 #8587a3 #f1b341 #d63f2e';
  value += `Return ONLY the 5 hex color codes. Create the colors for this: "${prompt}"`;

  return value;
}
