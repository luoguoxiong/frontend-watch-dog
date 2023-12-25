import { IModel } from 'egg';

export const isExitTable = async (model:IModel, targetTable:string) => {
  const allTable = await model.getQueryInterface().showAllTables();
  return allTable.includes(targetTable);
};
