import type OpenAI from 'openai';

export function mapOpenAIChatCompletion(entity: OpenAI.Chat.ChatCompletion): string[] {
  return entity.choices
    .map(entity => entity.message.content)
    .filter(v => v !== null);
}
