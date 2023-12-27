import { Service } from 'egg';

class RedisCacheService extends Service {
  async checkIndexIsExists(tableNmae:string) {
    return await this.app.redis.get(tableNmae) === '1';
  }
  async setIndex(indexName:string) {
    await this.app.redis.set(indexName, '1');
  }
  async deleteIndex(indexName:string) {
    await this.app.redis.del(indexName);
  }
}

export default RedisCacheService;
