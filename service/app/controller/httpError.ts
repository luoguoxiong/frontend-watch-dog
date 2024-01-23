import { Controller } from 'egg';

export default class HttpErrorController extends Controller {
  public async getHttpErrorRank() {
    const { ctx, service } = this;
    const { appId, beginTime, endTime } = ctx.query;
    const data = await service.elasticsearch.report.httpError.getHttpErrorRank(appId, beginTime, endTime);
    ctx.success(data);
  }
}
