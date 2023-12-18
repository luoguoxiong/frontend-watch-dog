import { Application } from 'typings/app';
import { pagesModel } from '@/app/model/pages';

const isExitTable = async (app:Application, targetTable) => {
  const allTable = await app.model.getQueryInterface().showAllTables();
  return allTable.includes(targetTable);
};

export default {
  async getPagesModel(appId:string) {
    const app = this as Application;

    const tableName = `pages_${appId}_reports`;

    const isExist = await isExitTable(app, tableName);

    const model = app.model.define(tableName, pagesModel);
    if (!isExist) {
      await model.sync();
    }
    return model;
  },
};
