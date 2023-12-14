import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, service } = this;
    const count = await ctx.model.Users.count();
    service.report.sendMessgeToKafka({ count: Math.random() });
    ctx.body = {
      succes: true,
      data: count,
    };
  }
}
