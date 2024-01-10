import dayjs from 'dayjs';
import { Controller } from 'egg';
export default class AnalyseController extends Controller {
  async getDayActiveUsers() {
    try {
      const query = this.ctx.query;
      const count = await this.service.redis.everyDayActiveUsers.getDayActiceUsers(query.appId, query.date);
      this.ctx.success(count);
    } catch (error) {
      this.app.logger.error(error);
    }
  }

  async getWebVisitTop() {
    try {
      const query = this.ctx.query;
      const top = query.top;
      const type = query.type as any;
      const data = await this.service.redis.top.getTopData(query.appId, type, Number(top));
      this.ctx.success(data);
    } catch (error) {
      this.app.logger.error(error);
    }
  }

  async getNewUsers() {
    try {
      const query = this.ctx.query;
      const data = await this.service.redis.dayNewUsers.getOneDayNewUsers(query.appId, query.date);
      this.ctx.success(data);
    } catch (error) {
      this.app.logger.error(error);
    }
  }

  async getAllUsers() {
    try {
      const query = this.ctx.query;
      const data = await this.service.redis.dayNewUsers.getAllUsers(query.appId);
      this.ctx.success(data);
    } catch (error) {
      this.app.logger.error(error);
    }
  }

  async getTodayTraffic() {
    const today = dayjs().format('YYYY-MM-DD');
    const lastDay = dayjs().add(-1, 'day').format('YYYY-MM-DD');
    const { appId } = this.ctx.query;
    const allUsers = await this.service.redis.dayNewUsers.getAllUsers(appId);
    const activeUsers = await this.service.redis.everyDayActiveUsers.getDayActiceUsers(appId, today);
    const activeUsers2 = await this.service.redis.everyDayActiveUsers.getDayActiceUsers(appId, lastDay);
    const newUsers = await this.service.redis.dayNewUsers.getOneDayNewUsers(appId, today);
    const newUsers2 = await this.service.redis.dayNewUsers.getOneDayNewUsers(appId, lastDay);
    const pv = await this.service.redis.everyDayPv.getPv(appId, today);
    const pv2 = await this.service.redis.everyDayPv.getPv(appId, lastDay);
    const ip = await this.service.redis.everyDayIps.getIps(appId, today);
    const ip2 = await this.service.redis.everyDayIps.getIps(appId, lastDay);
    this.ctx.success({
      allUsers,
      activeUsers: [ activeUsers, activeUsers2 ],
      newUsers: [ newUsers, newUsers2 ],
      pv: [ pv, pv2 ],
      ip: [ ip, ip2 ],
    });
  }

}
