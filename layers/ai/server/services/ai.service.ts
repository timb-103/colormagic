import type { OpenAIService } from '~/layers/openai/server/services/openai.service';

export class AIService {
  constructor(
    private readonly openAIService: OpenAIService
  ) {}

  public async getByPrompt(prompt: string): Promise<string[]> {
    const moderations = await this.openAIService.getModeration(prompt);

    if (moderations.results[0].flagged) {
      throw createError({ statusCode: 403, statusMessage: 'Prompt was flagged.' });
    }

    return await this.openAIService.getByMessages([{
      content: prompt,
      role: 'user'
    }]);
  }
}
