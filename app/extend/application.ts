import { Application } from 'typings/app';

export default {
  async createTable(appId:string) {
    const app = this as Application;

    const { STRING } = app.Sequelize;
    const DynamicModel = app.model.define(`user-${appId}`, {
      columnName: {
        type: STRING,
        comment: 'toDo',
      },
      age: {
        type: STRING,
        comment: 'toDo',
      },
    });
    // 同步模型到数据库
    await DynamicModel.sync();
    return DynamicModel;
  },
};

