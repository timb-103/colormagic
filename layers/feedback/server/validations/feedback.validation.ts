import { type H3Event } from 'h3';
import { CreateFeedbackInputDtoSchema, type CreateFeedbackInputDto } from '../dtos/feedback.dto';
import { validateBody } from '~/layers/common/utils/validate.util';

export class FeedbackValidation {
  public async getCreateInputBody(event: H3Event): Promise<CreateFeedbackInputDto> {
    return await validateBody(event, CreateFeedbackInputDtoSchema, { includeAjvFormats: true });
  }
}
