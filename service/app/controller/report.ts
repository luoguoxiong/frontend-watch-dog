import { Controller } from 'egg';
import UAParser from 'ua-parser-js';
import { ReportItem } from '@/app/service/elasticsearch/reportType';
import { BluBiuResponseCode } from '@/app/extend/context.type';
import { getUserIp, getIpAddress } from '@/app/utils';
export default class ReportController extends Controller {
  public async index() {
    const { ctx, service } = this;
    const data = JSON.parse( ctx.query.data) as ReportItem[];

    const isOk = await service.redis.cache.getAppIsUse(ctx.query.appId);
    if (isOk) {
      data.forEach((item) => {
        const parser = new UAParser();
        const agent = ctx.headers['user-agent'];
        const ip = getUserIp(ctx);
        const { province, country, city } = getIpAddress(ip);
        parser.setUA(agent);
        const result = parser.getResult();
        const querys = {
          ...item,
          ip,
          browserName: result.browser.name,
          browserVersion: result.browser.version,
          browserMajor: result.browser.major,
          osName: result.os.name,
          osVersion: result.os.version,
          deviceVendor: result.device.vendor,
          deviceModel: result.device.model,
          ua: result.ua,
          province,
          country,
          city,
        };
        service.kafuka.report.sendMessgeToKafka(querys);
      });
      ctx.success();
    } else {
      ctx.result(BluBiuResponseCode.APPIDNOUSE);
    }
  }
}
