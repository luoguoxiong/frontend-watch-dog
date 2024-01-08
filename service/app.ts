import { Application } from 'egg';
import { useKafka } from '@/app/service/kafuka';
import { useElasticsearch } from '@/app/service/elasticsearch';
import IP2Region from 'ip2region';
export default function(app: Application) {
  const ctx = app.createAnonymousContext();
  app.beforeStart(async () => {
    useKafka(app);
    useElasticsearch(app);
    const ip2Region = new IP2Region();
    const ipAdress = ip2Region.search('59.32.95.176');
    console.log(ipAdress);

    ctx.service.kafuka.report.useKafkaConsume();
  });
}
