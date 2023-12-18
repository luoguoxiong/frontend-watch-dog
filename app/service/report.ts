import { Service } from 'egg';
import { Topics } from '@/app/kafka/type';
import { PageModelIn } from '@/app/model/pages';
export default class ReportService extends Service {
  async useKafkaConsume() {
    this.app.kafka.consumer(Topics.TopicWeb, async message => {
      const pageMsg = JSON.parse(message.value as string) as PageModelIn;
      const pagesModel = await this.app.getPagesModel(pageMsg.appId);
      await pagesModel.create({
        ...pageMsg,
      });
    });
  }

  sendMessgeToKafka(message:any) {
    this.app.kafka.send(Topics.TopicWeb, message);
  }
}

export interface NewsItem {
  id: number;
  title: string;
}
