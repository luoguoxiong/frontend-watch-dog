import { Controller } from 'egg';

export default class PerformanceController extends Controller {
  public async getPagesPerformance() {
    const { ctx, service } = this;
    const data = await service.elasticsearch.pages.index.analyzePageTrafficStats(ctx.query.appId, 1703502000000, 17035056000000);
    this.ctx.success({ data });
  }
}
