import { Service } from 'egg';

class RedisSerr extends Service {
  checkAppStatus() {
    this.app.redis.set('test', 123);
  }
}

export default RedisSerr;
