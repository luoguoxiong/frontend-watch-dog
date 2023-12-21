import { Controller } from 'egg';

export default class PerformanceController extends Controller {
  public async getPagesPerformance() {
    const { service, ctx } = this;
    const data = await service.performance.getList(ctx.query);
    this.ctx.success({ data });
  }
}
