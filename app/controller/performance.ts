import { Controller } from 'egg';

export default class PerformanceController extends Controller {
  public async getPagesPerformance() {
    const { ctx, service } = this;
    this.service.elasticsearch.pages.analyzePageUv(ctx.query.appId);
    const data = await service.elasticsearch.pages.getReportData(ctx.query.appId);
    this.ctx.success({ data });
  }
}
