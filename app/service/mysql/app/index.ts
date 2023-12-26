import { Service } from 'egg';

import * as sequelize from 'sequelize';

import { AppModel, AppModelIn } from './type';

export default class TrafficMysqlService extends Service {
  private async getModel():Promise<sequelize.ModelCtor<sequelize.Model<AppModelIn>>> {
    const model = this.app.model.define('app', AppModel);
    return model;
  }

  async createApp(data:AppModelIn) {
    const t = await this.app.model.transaction();
    try {
      const model = await this.getModel();
      await model.create({
        ...data,
        status: 1,
      });
      await this.service.mysql.traffics.index.createTable(data.appId);
      t.commit();
    } catch (error) {
      t.rollback();
    }
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
  async checkAppStatus(appId:string):Promise<boolean> {
    const model = await this.getModel();
    const data = await model.findOne({
      where: {
        appId,
      },
    });
    return data?.getDataValue('status') === 1;
  }
  async getList() {
    const model = await this.getModel();
    return await model.findAll();
  }
}
