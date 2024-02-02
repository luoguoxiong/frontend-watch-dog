import { Controller } from 'egg';

export default class PerformanceController extends Controller {
  public async getAppAvgPerformance() {
    const { ctx, service } = this;
    const data = await service.elasticsearch.report.performance.getAppAvgPerformance(ctx.query.appId);
    const [all, fast, slow] = await Promise.all([
      this.ctx.service.elasticsearch.report.performance.getPageOpenRate(ctx.query.appId),
      this.ctx.service.elasticsearch.report.performance.getPageOpenRate(ctx.query.appId, [0, 1000]),
      this.ctx.service.elasticsearch.report.performance.getPageOpenRate(ctx.query.appId, [5000, 100000]),
    ]);
    ctx.success({
      ...data,
      fastRote: { value: fast / all },
      slowRote: { value: slow / all },
    });
  }

  public async getPageAvgPerformance() {
    const { ctx, service } = this;
    const { appId, beginTime, endTime } = ctx.query;
    const data = await service.elasticsearch.report.performance.getPageAvgPerformance(appId, beginTime, endTime);
    ctx.success(data);
  }

  public async getPerformance() {
    const { pageUrl, beginTime, endTime, whiteTime, from, size, appId, sorterName, sorterKey } = this.ctx.query;
    const data = await this.service.elasticsearch.report.performance.getPerformance(appId, {
      pageUrl,
      beginTime: beginTime ? new Date(beginTime) : undefined,
      endTime: endTime ? new Date(endTime) : undefined,
      whiteTime: whiteTime ? Number(whiteTime) as 1 | 2 | 3 |4 : undefined,
      from: from ? Number(from) - 1 : 1,
      size: size ? Number(size) : 10,
      sorterName,
      sorterKey,
    });
    this.ctx.success(data);
  }

}
