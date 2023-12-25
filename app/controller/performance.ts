import { Controller } from 'egg';

export default class PerformanceController extends Controller {
  public async getPagesPerformance() {
    const { ctx, service } = this;
    const data = await service.elasticsearch.pages.index.analyzePageTrafficStats(ctx.query.appId, 0, 11212121212121, 'userId');
    this.ctx.success({ data });
  }
}
