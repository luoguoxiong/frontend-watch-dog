import { Service } from 'egg';

import { createIndexName } from '@/app/utils';

export default class ReportBaseEsService extends Service {
  getEsIndexName = (appId: string) => createIndexName(this.app.config.appIndexName.page_report, appId);

  async createIndex(appId: string) {
    try {
      const { body } = await this.app.esClient.indices.create({
        index: this.getEsIndexName(appId),
        body: {
          mappings: {
            properties: {
              isFirst: { type: 'boolean' },
              domain: { type: 'keyword' },
              pageUrl: { type: 'keyword' },
              query: { type: 'keyword' },
              type: { type: 'keyword' },
              /** 点击事件 */
              clickElement: { type: 'keyword' },
              /** 性能相关 */
              dnsTime: { type: 'double' },
              tcpTime: { type: 'double' },
              whiteTime: { type: 'double' },
              fcp: { type: 'double' },
              ttfb: { type: 'double' },
              lcp: { type: 'double' },
              fid: { type: 'double' },
              /** 资源加载相关 */
              rescources: {
                type: 'nested', // 使用nested类型来表示数组对象
                properties: {
                  resource: {
                    'type': 'keyword',
                  },
                  duration: {
                    'type': 'double',
                  },
                  size: {
                    'type': 'double',
                  },
                  type: {
                    'type': 'keyword',
                  },
                },
              },
              /** 接口请求相关 */
              url: { type: 'keyword' },
              method: { type: 'keyword' },
              reqHeaders: { type: 'keyword' },
              reqBody: { type: 'keyword' },
              requestType: { type: 'keyword' },
              status: { type: 'keyword' },
              cost: { type: 'double' },
              /** js错误相关 */
              message: { type: 'keyword' },
              colno: { type: 'keyword' },
              lineno: { type: 'keyword' },
              stack: { type: 'keyword' },
              filename: { type: 'keyword' },
              /** 资源加载错误相关 */
              resourceType: { type: 'keyword' },
              resourceUrl: { type: 'keyword' },
              /** Reject错误相关 */
              reason: { type: 'keyword' },
              /** 页面状态相关 */
              inTime: { type: 'double' },
              leaveTime: { type: 'double' },
              residence: { type: 'double' },
              /** 用户相关 */
              userTimeStamp: { type: 'keyword' },
              markUserId: { type: 'keyword' },
              userId: { type: 'keyword' },
              /** 设备相关信息 */
              browserName: { type: 'keyword' },
              browserVersion: { type: 'keyword' },
              browserMajor: { type: 'keyword' },
              osName: { type: 'keyword' },
              osVersion: { type: 'keyword' },
              deviceVendor: { type: 'keyword' },
              deviceModel: { type: 'keyword' },
              ua: { type: 'keyword' },
              /** 地理位置相关 */
              ip: { type: 'keyword' },
              province: { type: 'keyword' },
              country: { type: 'keyword' },
              city: { type: 'keyword' },
              '@timestamp': { type: 'date' },
            },
          },
          // 定义索引的设置 例如分片数、副本数等
          settings: {},
        },
      });
      return body;
    } catch (error) {
      this.app.logger.error(error);
    }
  }

  async saveReportData(appId: string, reportData: any) {
    try {
      return await this.app.esClient.index({
        index: this.getEsIndexName(appId),
        op_type: 'create', // 创建自增Id
        body: {
          ...reportData,
          '@timestamp': new Date(),
        },
      });
    } catch (error) {
      this.app.logger.error(error);
    }
  }
}
