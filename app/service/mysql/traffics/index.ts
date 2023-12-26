import { Service } from 'egg';
import * as sequelize from 'sequelize';
import { TrafficModel, TrafficModelIn } from './type';
import { createIndexName } from '@/app/utils';

export default class TrafficMysqlService extends Service {

  private getMysqlTableName = (appId:string) => createIndexName(this.app.config.appIndexName.page_traffics, appId);

  async createTable(appId:string) {
    try {
      const model = this.app.model.define(this.getMysqlTableName(appId), TrafficModel);
      await model.sync();
    } catch (error) {
      throw error;
    }
  }

  private async getModel(appId:string):Promise<sequelize.ModelCtor<sequelize.Model<TrafficModelIn>>> {
    return this.app.model.define(this.getMysqlTableName(appId), TrafficModel);
  }

  async insertData(data:TrafficModelIn) {
    const model = await this.getModel(data.appId);
    await model.create({
      ...data,
    });
  }
}
