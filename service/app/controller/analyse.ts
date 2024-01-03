import { Controller } from 'egg';
export default class AnalyseController extends Controller {
  async getDayActiveUsers() {
    try {
      const query = this.ctx.query;
      const count = await this.service.redis.everyDayActiveUsers.getDayActiceUsers(query.appId);
      this.ctx.success({
        count,
      });
    } catch (error) {
      this.app.logger.error(error);
    }
  }

}
