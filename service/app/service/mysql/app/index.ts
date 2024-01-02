import { Service } from 'egg';
import * as sequelize from 'sequelize';
import { AppModel, AppModelIn } from './type';

export default class AppMysqlService extends Service {
  private async getModel():Promise<sequelize.ModelCtor<sequelize.Model<AppModelIn>>> {
    const tableName = 'app';
    const model = this.app.model.define(tableName, AppModel);
    const isExist = await this.service.redis.cache.checkIndexIsExists(tableName);
    if (!isExist) {
      await model.sync();
      await this.service.redis.cache.setIndex(tableName);
    }
    return model;
  }

  async createApp(data:AppModelIn) {
    try {
      const model = await this.getModel();
      await this.service.redis.cache.setIndex(data.appId);
      await model.create({
        ...data,
        status: 1,
      });
    } catch (error) {
      this.app.logger.error(error);
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
    const isInCache = await this.service.redis.cache.checkIndexIsExists(appId);
    if (isInCache) return true;
    const model = await this.getModel();
    const data = await model.findOne({
      where: {
        appId,
      },
    });
    const isExist = data?.getDataValue('status') === 1;
    await this.service.redis.cache.setIndex(appId);
    return isExist;
  }
  async getList(userId:number) {
    const model = await this.getModel();
    return await model.findAll({
      where: {
        createId: userId,
      },
    });
  }
}
