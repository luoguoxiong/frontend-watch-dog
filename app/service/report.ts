import { Service } from 'egg';
import { Topics } from '@/app/kafka/type';
export default class ReportService extends Service {
  async useKafkaConsume() {
    this.app.kafka.consumer(Topics.TopicWeb, messge => {
      console.log('messge', messge);
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
