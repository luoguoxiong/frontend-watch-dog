import { Service } from 'egg';

import { cacheConfig } from '@/app/utils';

import { isExitTable } from '@/app/utils/mysql';

import * as sequelize from 'sequelize';

import { AppModel, AppModelIn } from './type';

const mysqlModelIsInitConfig = cacheConfig();

export default class TrafficMysqlService extends Service {

  private getMysqlTableName = () => 'app';

  private async checkMysqlModel() {
    const tableName = this.getMysqlTableName();
    const isExistInCache = mysqlModelIsInitConfig.get(tableName);
    if (isExistInCache) return true;
    const indexExists = await isExitTable(this.app.model, tableName);
    if (indexExists) return true;
    await this.createTable();
    mysqlModelIsInitConfig.set(tableName, true);
    return true;
  }

  private async createTable() {
    try {
      const model = this.app.model.define(this.getMysqlTableName(), AppModel);
      await model.sync();
      return model;
    } catch (error) {
      throw error;
    }
  }

  private async getModel():Promise<sequelize.ModelCtor<sequelize.Model<AppModelIn>>> {
    await this.checkMysqlModel();
    return this.app.model.define(this.getMysqlTableName(), AppModel);
  }

  async insertData(data:AppModelIn) {
    const model = await this.getModel();
    await model.create({
      ...data,
    });
  }
  async getIsUseApps():Promise<string[]|undefined> {
    try {
      const model = await this.getModel();
      const result = await model.findAll({
        where: {
          status: 1,
        },
      });
      return result.map(item => item.getDataValue('appId'));
    } catch (error) {
      this.app.logger.error(error);
    }
  }
}
