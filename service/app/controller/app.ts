import { Controller } from 'egg';
export default class ReportController extends Controller {
  public async index() {
    // await this.service.mysql.app.index.createApp({
    //   appId: 'luoguoxiong002',
    //   status: 1,
    //   createId: 1,
    // });
    // await this.service.elasticsearch.pages.index.createIndex('luoguoxiong002');
    this.service.redis.test.checkAppStatus();
    this.ctx.success();
  }
}
