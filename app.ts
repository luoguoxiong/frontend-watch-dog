import { Application } from 'egg';
import { useKafka } from '@/app/kafka';

export default function(app: Application) {
  const ctx = app.createAnonymousContext();
  app.beforeStart(async () => {
    useKafka(app);
    ctx.service.report.useKafkaConsume();
    console.log('blibiu....');
  });
}
