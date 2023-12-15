import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, service } = this;
    // const userModel = await app.createTable('222');
    // const count = await userModel.count();
    // console.log('app.model.Book', app.model.Book('goods'));
    service.report.sendMessgeToKafka({ count: Math.random() });
    ctx.queryError();
  }
}
