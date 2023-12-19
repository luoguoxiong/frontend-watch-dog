import { Controller } from 'egg';
import { PageModelIn } from '@/app/model/pages';
import { BluBiuResponseCode } from '@/app/extend/context.type';
import UAParser from 'ua-parser-js';
import { getUserIp } from '@/app/utils';
export default class ReportController extends Controller {
  public async index() {
    const { ctx, service } = this;
    const query = ctx.query as any as PageModelIn;

    const ip = getUserIp(ctx);
    console.log('ip', ip);

    const isOk = await service.app.checkAppIdStatus(query.appId);

    if (isOk) {
      const parser = new UAParser();
      const agent = ctx.headers['user-agent'];
      console.log('agent', agent);
      parser.setUA(agent);
      const result = parser.getResult();
      console.log('result', result);
      service.report.sendMessgeToKafka(query);
      ctx.success();
    } else {
      ctx.result(BluBiuResponseCode.APPIDNOUSE);
    }
  }
}
