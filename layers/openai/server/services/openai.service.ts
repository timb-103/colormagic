import type OpenAI from 'openai';
import { mapOpenAIChatCompletion } from '../helpers/openai.helper';

export class OpenAIService {
  constructor(
    private readonly client: OpenAI
  ) {}

  public async getModeration(input: string): Promise<OpenAI.Moderations.ModerationCreateResponse> {
    return await this.client.moderations.create({ input });
  }

  public async getByMessages(messages: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming['messages']): Promise<string[]> {
    const entity = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 200,
      messages
    });

    return mapOpenAIChatCompletion(entity);
  }
}
