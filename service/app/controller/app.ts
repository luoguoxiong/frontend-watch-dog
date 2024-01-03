import { Controller } from 'egg';
import { getCookieMessge } from '@/app/utils/getCookieMessge';
import { v4 as uuidv4 } from 'uuid';
export default class ReportController extends Controller {
  async getAppList() {
    try {
      const userId = await getCookieMessge(this.ctx);
      if (userId) {
        const data = await this.service.mysql.app.index.getList(userId);
        this.ctx.success(data);
      }
    } catch (error) {
      this.app.logger.error(error);
    }
  }

  async createApp() {
    try {
      const { appType, appName } = this.ctx.request.body;
      const userId = await getCookieMessge(this.ctx);
      if (userId) {
        console.log('uuid', uuidv4);

        const appId = uuidv4();
        await this.service.mysql.app.index.createApp({
          appId,
          status: 1,
          createId: userId,
          appType,
          appName,
        });
        await this.service.elasticsearch.pages.index.createIndex(appId);
        this.ctx.success();
      }
    } catch (error) {
      this.app.logger.error(error);
    }
  }
}
