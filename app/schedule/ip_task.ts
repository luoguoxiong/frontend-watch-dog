import { Subscription } from 'egg';

class UpdateCache extends Subscription {
  static get schedule() {
    return {
      interval: '2m',
      type: 'all',
      disable: false,
      immediate: true,
    };
  }
  async subscribe() {
    this.service.pvuvSchedule.getPvuvByMinute();
  }
}

export default UpdateCache;
