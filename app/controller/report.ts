import { Controller } from 'egg';
import { PageModelIn } from '@/app/model/pages';
export default class ReportController extends Controller {
  public async index() {
    const { ctx, service, app } = this;
    const query = ctx.query as any as PageModelIn;
    const pagesModel = await app.getPagesModel(query.appId);
    const count = await pagesModel.count();
    // console.log('app.model.Book', app.model.Book('goods'));
    service.report.sendMessgeToKafka(query);
    ctx.success({ count });
  }
}
