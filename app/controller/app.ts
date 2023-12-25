import { Controller } from 'egg';
export default class ReportController extends Controller {
  public async index() {
    await this.service.mysql.app.index.insertData({
      appId: 'luoguoxiong001',
      status: 1,
      createId: 1,
    });
    this.ctx.success({});
  }
}
