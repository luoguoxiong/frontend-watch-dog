import { Controller } from 'egg';
export default class ReportController extends Controller {
  public async index() {
    const { pageUrl, beginTime, endTime, whiteTime, from, size } = this.ctx.query;
    const data = await this.service.elasticsearch.report.performance.getPerformance('66ije1on1705577187109', {
      pageUrl,
      beginTime: beginTime ? new Date(beginTime) : undefined,
      endTime: endTime ? new Date(endTime) : undefined,
      whiteTime: whiteTime ? Number(whiteTime) as 1 | 2 | 3 |4 : undefined,
      from: from ? Number(from) : 1,
      size: size ? Number(size) : 10,
    });
    this.ctx.success(data);
  }
}
