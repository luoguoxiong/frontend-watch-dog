import { Application } from 'egg';
import { pagesModel, PageModelIn } from '@/app/model/pages';
import { TrafficModel, TrafficModelIn } from '@/app/model/traffic';
import * as sequelize from 'sequelize';
const isExitTable = async (app:Application, targetTable) => {
  const allTable = await app.model.getQueryInterface().showAllTables();
  return allTable.includes(targetTable);
};

export default {
  async getPagesModel(appId:string):Promise<sequelize.ModelCtor<sequelize.Model<PageModelIn>>> {
    const app = this as Application;

    const tableName = `pages_${appId}_reports`;

    const isExist = await isExitTable(app, tableName);

    const model = app.model.define(tableName, pagesModel);
    if (!isExist) {
      await model.sync();
    }
    return model;
  },
  async getTrafficStatsModel(appId:string):Promise<sequelize.ModelCtor<sequelize.Model<TrafficModelIn>>> {
    const app = this as Application;

    const tableName = `pages_${appId}_traffics`;

    const isExist = await isExitTable(app, tableName);

    const model = app.model.define(tableName, TrafficModel);
    if (!isExist) {
      await model.sync();
    }
    return model;
  },
};
