import { Application } from 'egg';
import { pagesModel, PageModelIn } from '@/app/model/pages';
import { TrafficModel, TrafficModelIn } from '@/app/model/traffic';
import * as sequelize from 'sequelize';
import { cacheConfig } from '@/app/utils';

const modelIsInitConfig = cacheConfig();

const isExitTable = async (app:Application, targetTable:string) => {
  const allTable = await app.model.getQueryInterface().showAllTables();
  return allTable.includes(targetTable);
};

export default {
  async  checkTableIsExit(tableName:string, modelAttributes:sequelize.ModelAttributes) {
    const app = this as Application;
    const model = modelIsInitConfig.get(tableName);
    if (!model) {
      const model = app.model.define(tableName, modelAttributes);
      const isExist = await isExitTable(app, tableName);
      !isExist && await model.sync();
      modelIsInitConfig.set(tableName, model);
      return model;
    }
    return model;
  },

  async getPagesModel(appId:string):Promise<sequelize.ModelCtor<sequelize.Model<PageModelIn>>> {
    const tableName = `pages_${appId}_reports`;
    return this.checkTableIsExit(tableName, pagesModel);
  },

  async getTrafficStatsModel(appId:string):Promise<sequelize.ModelCtor<sequelize.Model<TrafficModelIn>>> {
    const tableName = `pages_${appId}_traffics`;
    return this.checkTableIsExit(tableName, TrafficModel);
  },
};
