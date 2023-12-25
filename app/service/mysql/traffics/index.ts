import { Service } from 'egg';

import { cacheConfig } from '@/app/utils';

import { isExitTable } from '@/app/utils/mysql';

import * as sequelize from 'sequelize';

import { TrafficModel, TrafficModelIn } from './type';

const mysqlModelIsInitConfig = cacheConfig();

export default class TrafficMysqlService extends Service {

  private getMysqlTableName = (appId:string) => `page-traffics-${appId}`;

  private async checkMysqlModel(appId:string) {
    const tableName = this.getMysqlTableName(appId);
    const isExistInCache = mysqlModelIsInitConfig.get(tableName);
    if (isExistInCache) return true;
    const indexExists = await isExitTable(this.app.model, tableName);
    if (indexExists) return true;
    await this.createTable(tableName);
    mysqlModelIsInitConfig.set(tableName, true);
    return true;
  }

  private async createTable(appId:string) {
    try {
      const model = this.app.model.define(this.getMysqlTableName(appId), TrafficModel);
      await model.sync();
      return model;
    } catch (error) {
      throw error;
    }
  }

  private async getModel(appId:string):Promise<sequelize.ModelCtor<sequelize.Model<TrafficModelIn>>> {
    await this.checkMysqlModel(appId);
    return this.app.model.define(this.getMysqlTableName(appId), TrafficModel);
  }

  async insertData(data:TrafficModelIn) {
    const model = await this.getModel(data.appId);
    await model.create({
      ...data,
    });
  }
}
