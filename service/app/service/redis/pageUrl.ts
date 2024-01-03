import { Service } from 'egg';
import dayjs from 'dayjs';
class RedisPageUrlService extends Service {
  private getKeyName = (appId:string, dateString:string) => `${appId}-${dateString}-activeUsers`;

  async addUsers(appId:string, userId:string) {
    await this.app.redis.pfadd(this.getKeyName(appId, dayjs().format('YYYY-MM-DD')), userId);
  }

  async getDayActiceUsers(appId:string, dateString?:string) {
    return await this.app.redis.pfcount(this.getKeyName(appId, dateString || dayjs().format('YYYY-MM-DD')));
  }
}

export default RedisPageUrlService;
