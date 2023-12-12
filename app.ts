import { Application } from 'egg';
import kafka from './app/kafka';
export default function(app: Application) {
  app.beforeStart(async () => {
    kafka(app);
    console.log('blibiu....');
  });
}
