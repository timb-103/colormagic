import { type H3Event } from 'h3';
import {
  ClonePaletteInputDtoSchema,
  CreatePaletteInputDtoSchema, CreatePaletteLikeInputDtoSchema, DeletePaletteLikeInputDtoSchema, ListPalettebyIdsInputDtoSchema, ListPaletteInputDtoSchema, ListPaletteLikesbyIdsInputDtoSchema, ListPaletteLikesInputDtoSchema, PaletteInputDtoSchema,
  PaletteLikeInputDtoSchema,
  type ClonePaletteInputDto,
  type CreatePaletteInputDto, type CreatePaletteLikeInputDto, type DeletePaletteLikeInputDto, type ListPalettebyIdsInputDto, type ListPaletteInputDto, type ListPaletteLikesbyIdsInputDto, type ListPaletteLikesInputDto, type PaletteInputDto,
  type PaletteLikeInputDto
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

  public async getListByIdsInputBody(event: H3Event): Promise<ListPalettebyIdsInputDto> {
    return await validateBody(event, ListPalettebyIdsInputDtoSchema);
  }

  public async getCloneInputBody(event: H3Event): Promise<ClonePaletteInputDto> {
    return await validateBody(event, ClonePaletteInputDtoSchema);
  }

  public async getLikeInputParams(event: H3Event): Promise<PaletteLikeInputDto> {
    return validateParams(event, PaletteLikeInputDtoSchema);
  }

  public async getCreateLikeInputParams(event: H3Event): Promise<CreatePaletteLikeInputDto> {
    return validateParams(event, CreatePaletteLikeInputDtoSchema);
  }

  public async getDeleteLikeInputParams(event: H3Event): Promise<DeletePaletteLikeInputDto> {
    return validateParams(event, DeletePaletteLikeInputDtoSchema);
  }

  public async getListLikesByIdsInputBody(event: H3Event): Promise<ListPaletteLikesbyIdsInputDto> {
    return await validateBody(event, ListPaletteLikesbyIdsInputDtoSchema);
  }

  public async getListLikesInputBody(event: H3Event): Promise<ListPaletteLikesInputDto> {
    return await validateBody(event, ListPaletteLikesInputDtoSchema);
  }
}
