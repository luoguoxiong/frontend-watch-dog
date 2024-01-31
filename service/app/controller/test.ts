import { Controller } from 'egg';
export default class ReportController extends Controller {
  public async index() {
    const data = await this.ctx.service.elasticsearch.report.jsError.getOneDayJsError('wgnfezuv1706513953473');
    this.ctx.success(data);
  }
}
