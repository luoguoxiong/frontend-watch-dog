import { Service } from 'egg';
import parser from 'cron-parser';
export default class PvuvScheduleService extends Service {
  async getPvuvByMinute() {
    const interval = parser.parseExpression('0 */2 * * * *');
    const endTime = interval.prev().toString();
    const beginTime = interval.prev().toString();
    console.log('beginTime', beginTime);
    console.log('endTime', endTime);
  }
}

export interface NewsItem {
  id: number;
  title: string;
}
