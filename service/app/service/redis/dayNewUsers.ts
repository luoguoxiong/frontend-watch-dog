import { Service } from 'egg';
import dayjs from 'dayjs';
class RedisDayNewUsersService extends Service {
  private getKeyName = (appId:string, dateString:string) => `${appId}-${dateString}-dayNewUsers`;

  async analyseDayNewUsers(appId:string, userId:string) {
    const isHas = await this.app.redis.sismember(`${appId}-allUsers`, userId);
    if (!isHas) {
      const key = this.getKeyName(appId, dayjs().format('YYYY-MM-DD'));
      const todayNewUsers = await this.app.redis.get(key);
      await this.app.redis.set(key, todayNewUsers ? `${Number(todayNewUsers) + 1}` : 1);
      await this.app.redis.sadd(`${appId}-allUsers`, [ userId ]);
    }
  }

  async getOneDayNewUsers(appId:string, dateString?:string) {
    return await this.app.redis.get(this.getKeyName(appId, dayjs(dateString).format('YYYY-MM-DD')));
  }

  async getAllUsers(appId:string) {
    return await this.app.redis.scard(`${appId}-allUsers`);
  }
}

export default RedisDayNewUsersService;
