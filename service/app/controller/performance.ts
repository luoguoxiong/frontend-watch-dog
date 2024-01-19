import { Controller } from 'egg';

export default class PerformanceController extends Controller {
  public async getAppAvgPerformance() {
    const { ctx, service } = this;
    const data = await service.elasticsearch.report.performance.getAppAvgPerformance(ctx.query.appId);
    ctx.success(data);
  }

  public async getPageAvgPerformance() {
    const { ctx, service } = this;
    const { appId, beginTime, endTime } = ctx.query;
    const data = await service.elasticsearch.report.performance.getPageAvgPerformance(appId, beginTime, endTime);
    ctx.success(data);
  }

  public async getPerformance() {
    const { pageUrl, beginTime, endTime, whiteTime, from, size, appId } = this.ctx.query;
    const data = await this.service.elasticsearch.report.performance.getPerformance(appId, {
      pageUrl,
      beginTime: beginTime ? new Date(beginTime) : undefined,
      endTime: endTime ? new Date(endTime) : undefined,
      whiteTime: whiteTime ? Number(whiteTime) as 1 | 2 | 3 |4 : undefined,
      from: from ? Number(from) - 1 : 1,
      size: size ? Number(size) : 10,
    });
    this.ctx.success(data);
  }

}
