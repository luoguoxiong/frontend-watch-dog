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
      const top = query.top || 10;
      const data = await this.service.redis.top.getTopData(query.appId, 'webVisit', Number(top));
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
}
