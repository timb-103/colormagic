import { type H3Event } from 'h3';
import { CreatePaletteInputDtoSchema, PaletteInputDtoSchema, type CreatePaletteInputDto, type PaletteInputDto } from '../dtos/palette.dto';
import { validateBody } from '~/layers/common/utils/validate.util';

export class PaletteValidation {
  public async getCreateInputBody(event: H3Event): Promise<CreatePaletteInputDto> {
    return await validateBody(event, CreatePaletteInputDtoSchema);
  }

  public async getInputBody(event: H3Event): Promise<PaletteInputDto> {
    return await validateBody(event, PaletteInputDtoSchema);
  }
}
