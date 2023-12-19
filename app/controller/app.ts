import { Controller } from 'egg';
export default class ReportController extends Controller {
  public async index() {
    const { app } = this;
    await app.model.App.create({
      appId: 'luoguoxiong001',
      status: 1,
      createId: 1,
    });
    this.ctx.success({});
  }
}
