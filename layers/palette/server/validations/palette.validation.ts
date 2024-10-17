import { type H3Event } from 'h3';
import {
  CreatePaletteInputDtoSchema, ListPaletteInputDtoSchema, PaletteInputDtoSchema,
  type CreatePaletteInputDto, type ListPaletteInputDto, type PaletteInputDto
} from '../dtos/palette.dto';
import { validateBody, validateParams } from '~/layers/common/utils/validate.util';

export class PaletteValidation {
  public async getCreateInputBody(event: H3Event): Promise<CreatePaletteInputDto> {
    return await validateBody(event, CreatePaletteInputDtoSchema);
  }

  public async getInputBody(event: H3Event): Promise<PaletteInputDto> {
    return await validateBody(event, PaletteInputDtoSchema);
  }

  public async getInputParams(event: H3Event): Promise<PaletteInputDto> {
    return validateParams(event, PaletteInputDtoSchema);
  }

  public async getListInputBody(event: H3Event): Promise<ListPaletteInputDto> {
    return await validateBody(event, ListPaletteInputDtoSchema);
  }
}
