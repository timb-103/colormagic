import { type H3Event } from 'h3';
import { ImageByColorsInputDtoSchema, ImageByIdInputDtoSchema, ImageByTagInputDtoSchema, type ImageByColorsInputDto, type ImageByIdInputDto, type ImageByTagInputDto } from '../dtos/image.dto';
import { validateQuery, validateParams } from '~/layers/common/utils/validate.util';

export class ImageValidation {
  public async getInputQuery(event: H3Event): Promise<ImageByColorsInputDto> {
    const query = validateQuery(event, ImageByColorsInputDtoSchema);
    const hexCodes = query.colors.split(':');

    if (hexCodes.length > 5) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Too many colors.'
      });
    }

    return query;
  }

  public async getTagParams(event: H3Event): Promise<ImageByTagInputDto> {
    return validateParams(event, ImageByTagInputDtoSchema);
  }

  public async getByIdParams(event: H3Event): Promise<ImageByIdInputDto['params']> {
    return validateParams(event, ImageByIdInputDtoSchema.properties.params);
  }

  public async getByIdQuery(event: H3Event): Promise<ImageByIdInputDto['query']> {
    return validateQuery(event, ImageByIdInputDtoSchema.properties.query);
  }
}
