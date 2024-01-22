import { Controller } from 'egg';
export default class ReportController extends Controller {
  public async index() {
    this.ctx.success({});
  }
}
