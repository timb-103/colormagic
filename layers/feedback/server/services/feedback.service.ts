import type { FeedbackRepository } from '../repositories/feedback.repository';

export class FeedbackService {
  constructor(
    private readonly repository: FeedbackRepository
  ) {}

  public async create(email: string, feedback: string): Promise<void> {
    await this.repository.create({ email, feedback });
  }
}
