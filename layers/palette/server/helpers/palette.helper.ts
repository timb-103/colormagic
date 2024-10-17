import type { PaletteDto } from '../dtos/palette.dto';
import type { PaletteEntity } from '../entities/palette.entity';
import { arrangeColors } from '../../utils/color-arrange.util';
import paletteConfig from '../palette.config';

export function mapPaletteEntityToDto(entity: PaletteEntity): PaletteDto {
  return {
    id: entity._id.toHexString(),
    colors: arrangeColors(entity.colors, {
      brightness: 0,
      saturation: 0,
      warmth: 0
    }),
    /** @description required because older names could be inappropriate */
    text: new Date(entity.createdAt).getTime() > paletteConfig.aiNamesStartDateMs
      ? entity.text
      : 'Cool Palette'
  };
}

export function mapCreatePalettePrompt(prompt: string): string {
  let value = 'Generate a beautiful, bright color palette with 5 colors.';
  value += 'Align the tones. Avoid really close hues (can be a bit close). Eg. "sunset" would be #1e507b #4f6187 #8587a3 #f1b341 #d63f2e';
  value += 'If the input is hex colors then generate a similar palette. Doesn\'t have to be exactly the same, make it nicer.';
  value += 'Also create a name for this palette (can use input for it if not rude) and format like this: [name:Beach] or [name:Red Car]';
  value += `Return ONLY the 5 hex color codes and the name. Create the colors for this: "${prompt}"`;

  return value;
}
