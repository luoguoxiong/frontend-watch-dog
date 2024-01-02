import { Controller } from 'egg';
import { getCookieMessge } from '@/app/utils/getCookieMessge';
export default class ReportController extends Controller {
  public async index() {
    await this.service.mysql.app.index.createApp({
      appId: 'luoguoxiong002',
      status: 1,
      createId: 1,
    });
    await this.service.elasticsearch.pages.index.createIndex('luoguoxiong002');
    this.ctx.success();
  }

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
    const { appType } = this.ctx.request.body;
    await this.service.mysql.app.index.createApp({
      appId: 'luoguoxiong002',
      status: 1,
      createId: 1,
      appType,
    });
    await this.service.elasticsearch.pages.index.createIndex('luoguoxiong002');
    this.ctx.success();
  }
}
