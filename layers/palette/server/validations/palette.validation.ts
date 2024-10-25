import { type H3Event } from 'h3';
import {
  ClonePaletteInputParamsDtoSchema, ClonePaletteInputQueryDtoSchema, CreatePaletteInputDtoSchema,
  ListPaletteInputDtoSchema, PaletteInputDtoSchema, type ClonePaletteInputParamsDto, type ClonePaletteInputQueryDto,
  type CreatePaletteInputDto, type ListPaletteInputDto, type PaletteInputDto
} from '../dtos/palette.dto';
import {
  CreatePaletteLikeInputDtoSchema, DeletePaletteLikeInputDtoSchema,
  type CreatePaletteLikeInputDto, type DeletePaletteLikeInputDto
} from '../dtos/palette-like.dto';
import { validateBody, validateParams, validateQuery } from '~/layers/common/utils/validate.util';

export class PaletteValidation {
  public async getCreateInputQuery(event: H3Event): Promise<CreatePaletteInputDto> {
    return validateQuery(event, CreatePaletteInputDtoSchema);
  }

  public async getInputBody(event: H3Event): Promise<PaletteInputDto> {
    return await validateBody(event, PaletteInputDtoSchema);
  }

  public async getInputParams(event: H3Event): Promise<PaletteInputDto> {
    return validateParams(event, PaletteInputDtoSchema);
  }

  public async getListInputQuery(event: H3Event): Promise<ListPaletteInputDto> {
    const query = validateQuery(event, ListPaletteInputDtoSchema);

    /** @description ensure size limit */
    if (query.size !== undefined && parseInt(query.size) > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Size must be less than or equal to 100.'
      });
    }

    return query;
  }

  public async getCloneInputQuery(event: H3Event): Promise<ClonePaletteInputQueryDto> {
    return validateQuery(event, ClonePaletteInputQueryDtoSchema);
  }

  public async getCloneInputParams(event: H3Event): Promise<ClonePaletteInputParamsDto> {
    return validateParams(event, ClonePaletteInputParamsDtoSchema);
  }

  public async getCreateLikeInputParams(event: H3Event): Promise<CreatePaletteLikeInputDto> {
    return validateParams(event, CreatePaletteLikeInputDtoSchema);
  }

  public async getDeleteLikeInputParams(event: H3Event): Promise<DeletePaletteLikeInputDto> {
    return validateParams(event, DeletePaletteLikeInputDtoSchema);
  }
}
