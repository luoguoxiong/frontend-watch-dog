import { Application } from 'egg';
import { useKafka } from '@/app/kafka';
import { useElasticsearch } from '@/app/elasticsearch';
import './es-book';

export default function(app: Application) {
  const ctx = app.createAnonymousContext();
  app.beforeStart(async () => {
    useKafka(app);
    useElasticsearch(app);
    ctx.service.report.useKafkaConsume();
    console.log('blibiu....');
  });
}
