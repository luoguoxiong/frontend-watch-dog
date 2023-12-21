import { Service } from 'egg';
export default class performanceService extends Service {

  async getList(query) {
    const { app } = this;
    const { appId, page, pageSize } = query;
    const pagesModel = await app.getPagesModel(appId);
    try {
      const articles = await pagesModel.findAndCountAll({
        where: {
          isFirst: 1,
        },
        offset: (page - 1) * pageSize,
        limit: parseInt(pageSize),
        order: [[ 'createdAt', 'DESC' ]], // 可根据实际情况调整排序规则
      });
      return articles;
    } catch (error) {
      this.app.logger.error(error);
    }
  }

}
