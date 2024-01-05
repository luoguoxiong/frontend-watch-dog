import { Service } from 'egg';
import { Topics } from '@/app/service/kafuka/type';
import axios from 'axios';
import { PageModelIn } from '@/app/service/elasticsearch/pages/type';
export default class ReportService extends Service {
  async useKafkaConsume() {
    this.app.kafka.consumer(Topics.TopicWeb, async message => {
      const pageMsg = JSON.parse(message.value as string) as PageModelIn;
      this.ctx.service.elasticsearch.pages.index.saveReportData(pageMsg.appId, pageMsg);
      this.ctx.service.redis.everyDayActiveUsers.addUsers(pageMsg.appId, `${pageMsg.userId}`);
      this.ctx.service.redis.dayNewUsers.analyseDayNewUsers(pageMsg.appId, `${pageMsg.userId}`);
      this.ctx.service.redis.top.setTopData(pageMsg.appId, 'webVisit', pageMsg.pageUrl);
      if (pageMsg.browserName) {
        this.ctx.service.redis.top.setTopData(pageMsg.appId, 'browser', pageMsg.browserName);
      }
      if (pageMsg.deviceVendor) {
        this.ctx.service.redis.top.setTopData(pageMsg.appId, 'deviceVendor', pageMsg.deviceVendor);
      }
      if (pageMsg.osName) {
        this.ctx.service.redis.top.setTopData(pageMsg.appId, 'osName', pageMsg.osName);
      }
      if (pageMsg.ip !== '127.0.0.1') {
        const { data } = await axios.get(`https://restapi.amap.com/v3/ip?ip=${pageMsg.ip}&output=json&key=${this.app.config.amapKey}`);
        if (typeof data.province === 'string') {
          this.ctx.service.redis.top.setTopData(pageMsg.appId, 'city', data.province);
        }
      }
    });
  }

  sendMessgeToKafka(message:any) {
    this.app.kafka.send(Topics.TopicWeb, message);
  }
}
