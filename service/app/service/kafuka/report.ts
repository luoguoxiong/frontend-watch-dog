import { Service } from 'egg';
import { Topics } from '@/app/service/kafuka/type';
import { PageModelIn } from '@/app/service/elasticsearch/pages/type';
export default class ReportService extends Service {
  async useKafkaConsume() {
    this.app.kafka.consumer(Topics.TopicWeb, async message => {
      const pageMsg = JSON.parse(message.value as string) as PageModelIn;
      await this.ctx.service.elasticsearch.pages.index.saveReportData(pageMsg.appId, pageMsg);
      if (pageMsg?.userId) {
        // 统计日活人数
        await this.ctx.service.redis.everyDayActiveUsers.addUsers(pageMsg.appId, `${pageMsg.userId}`);
      }
    });
  }

  sendMessgeToKafka(message:any) {
    this.app.kafka.send(Topics.TopicWeb, message);
  }
}
