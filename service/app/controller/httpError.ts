import { Controller } from 'egg';

export default class HttpErrorController extends Controller {
  public async getHttpErrorRank() {
    const { ctx, service } = this;
    const { appId, beginTime, endTime } = ctx.query;
    const data = await service.elasticsearch.report.httpError.getHttpErrorRank(appId, beginTime, endTime);
    ctx.success(data);
  }
  public async getHttpDoneRank() {
    const { ctx, service } = this;
    const { appId, beginTime, endTime } = ctx.query;
    const data = await service.elasticsearch.report.httpError.getHttpDoneRank(appId, beginTime, endTime);
    ctx.success(data);
  }
  public async getHttpErrorRang(){
    const { ctx, service } = this;
    const { appId, beginTime } = ctx.query;
    const data = await service.elasticsearch.report.httpError.getOneDayHttpErrorCount(appId, beginTime);
    ctx.success(data);
  }
}
