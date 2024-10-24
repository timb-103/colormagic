import { type H3Event } from 'h3';
import { GoogleAuthInputDtoSchema, GoogleAuthUrlInputDtoSchema, type GoogleAuthInputDto, type GoogleAuthUrlInputDto } from '../dtos/google.dto';
import { validateBody } from '~/layers/common/utils/validate.util';

export class GoogleValidation {
  public async getAuthUrlInputBody(event: H3Event): Promise<GoogleAuthUrlInputDto> {
    return await validateBody(event, GoogleAuthUrlInputDtoSchema);
  }

  public async getAuthInputBody(event: H3Event): Promise<GoogleAuthInputDto> {
    return await validateBody(event, GoogleAuthInputDtoSchema);
  }
}
