import { Service } from 'egg';

class RedisJsErrorService extends Service {
  private getKeyName = (appId: string) => `${appId}-JsError`;

  async saveJsError(appId: string, dateString: string, errorCount: number) {
    await this.app.redis.hset(this.getKeyName(appId), dateString, errorCount);
  }

  async getJsError(appId: string, dateString: string) {
    return await this.app.redis.hget(this.getKeyName(appId), dateString);
  }
}

export default RedisJsErrorService;
