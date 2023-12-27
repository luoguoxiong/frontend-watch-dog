import { Service } from 'egg';
import * as sequelize from 'sequelize';
import { TrafficModel, TrafficModelIn } from './type';
import { createIndexName } from '@/app/utils';

export default class TrafficMysqlService extends Service {

  private getMysqlTableName = (appId:string) => createIndexName(this.app.config.appIndexName.page_traffics, appId);

  private async getModel(appId:string):Promise<sequelize.ModelCtor<sequelize.Model<TrafficModelIn>>> {
    const tableName = this.getMysqlTableName(appId);
    const model = this.app.model.define(tableName, TrafficModel);
    const isExist = await this.service.redis.cache.checkIndexIsExists(tableName);
    if (!isExist) {
      await model.sync();
      await this.service.redis.cache.setIndex(tableName);
    }
    return model;
  }

  async insertData(data:TrafficModelIn) {
    const model = await this.getModel(data.appId);
    await model.create({
      ...data,
    });
  }
}
