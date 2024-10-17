import { type H3Event } from 'h3';
import { OgInputDtoSchema, type OgInputDto } from '../dtos/og.dto';
import { validateQuery } from '~/layers/common/utils/validate.util';

export class OgValidation {
  public async getInputQuery(event: H3Event): Promise<OgInputDto> {
    const query = validateQuery(event, OgInputDtoSchema);
    const hexCodes = query.colors.split(':');

    if (hexCodes.length > 5) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Too many colors.'
      });
    }

    return query;
  }
}
