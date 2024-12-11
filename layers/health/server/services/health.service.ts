import { type Db } from 'mongodb';

export class HealthService {
  constructor(
    private readonly db: Db
  ) {}

  public async ping(): Promise<{ ok: number }> {
    const ping = await this.db.command({ ping: 1 });

    return {
      ok: ping.ok ?? 0
    };
  }
}
