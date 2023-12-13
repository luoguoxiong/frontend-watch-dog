import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, service } = this;
    service.report.sendMessgeToKafka({ count: Math.random() });
    ctx.body = {
      succes: true,
      data: 22,
    };
  }
}
