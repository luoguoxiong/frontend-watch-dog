import { Service } from 'egg';
export default class AppService extends Service {

  async checkAppIdStatus(appId:string) {
    const { app } = this;
    const result = await app.model.App.findOne({
      where: {
        appId,
        status: 1,
      },
    });
    return !!result?.getDataValue('appId');
  }

  async getIsUseApps():Promise<string[]|undefined> {
    try {
      const { app } = this;
      const result = await app.model.App.findAll({
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
