import { Controller } from 'egg';
export default class ReportController extends Controller {
  public async index() {
    const data = await this.ctx.service.elasticsearch.report.jsError.getOneDayJsError('wgnfezuv1706513953473');
    // const data = await this.ctx.service.elasticsearch.report.performance.getPageOpenRate('wgnfezuv1706513953473', [0, 100]);
    this.ctx.success(data);
  }
}
