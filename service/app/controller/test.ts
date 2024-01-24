import { Controller } from 'egg';
export default class ReportController extends Controller {
  public async index() {
    const data = await this.ctx.service.elasticsearch.report.httpError.getOneDayHttpErrorCount('m2fr7hh81705989923161', '2024-01-23');
    this.ctx.success({ data });
  }
}
