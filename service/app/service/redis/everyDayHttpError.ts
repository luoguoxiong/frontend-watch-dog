import { Service } from 'egg';

class RedisHttpErrorService extends Service {
  private getKeyName = (appId: string) => `${appId}-HttpError`;

  async saveHttpError(appId: string, dateString: string, errorCount: number) {
    await this.app.redis.hset(this.getKeyName(appId), dateString, errorCount);
  }

  async getHttpError(appId: string, dateString: string) {
    return Number(await this.app.redis.hget(this.getKeyName(appId), dateString)) || 0;
  }
}

export default RedisHttpErrorService;
