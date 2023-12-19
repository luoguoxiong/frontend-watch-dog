import { Service } from 'egg';

export default class AppService extends Service {
  /**
   * 异步方法：检查给定的 appId 的状态
   * @param {string} appId - 要检查的AppId
   * @return {Promise<boolean>} - 返回一个 Promise，解析为布尔值，表示是否找到符合条件的记录
   */
  async checkAppIdStatus(appId:string) {
    const { app } = this;
    const result = await app.model.App.findOne({
      where: {
        appId,
        status: 1,
      },
    });
    return !!result;
  }
}
