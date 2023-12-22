import { Service } from 'egg';

import { cacheConfig } from '@/app/utils';

const pageEsIndexIscCreateConfig = cacheConfig();

export default class PagesEsService extends Service {

  private getEsIndexName = (appId:string) => `page-report-${appId}`;

  private async checkIndex(appId:string) {
    const esIndexName = this.getEsIndexName(appId);
    const isExistInCache = pageEsIndexIscCreateConfig.get(esIndexName);
    if (isExistInCache) return true;

    const indexExists = await this.app.esClient.indices.exists({ index: esIndexName });
    if (indexExists) return true;
    await this.createIndex(esIndexName);
    pageEsIndexIscCreateConfig.set(esIndexName, true);
    return true;
  }

  private async createIndex(indexName:string) {
    try {
      const { body } = await this.app.esClient.indices.create({
        index: indexName,
        body: {
          mappings: {
            properties: {
              userId: { type: 'keyword' },
              pageUrl: { type: 'keyword' },
              ip: { type: 'keyword' },
              appId: { type: 'keyword' },
              isFirst: { type: 'boolean' },
              origin: { type: 'keyword' },
              browserName: { type: 'keyword' },
              browserVersion: { type: 'keyword' },
              browserMajor: { type: 'keyword' },
              osName: { type: 'keyword' },
              osVersion: { type: 'keyword' },
              deviceVendor: { type: 'keyword' },
              deviceModel: { type: 'keyword' },
              loadTime: { type: 'integer' },
              dnsTime: { type: 'integer' },
              tcpTime: { type: 'integer' },
              whiteTime: { type: 'integer' },
              domTime: { type: 'integer' },
              fetchTime: { type: 'integer' },
              reirectTime: { type: 'integer' },
              requestTime: { type: 'integer' },
              '@timestamp': { type: 'date', format: 'yyyy-MM-dd HH:mm:ss' },
            },
          },
          // 定义索引的设置 例如分片数、副本数等
          settings: {},
        },
      });
      return body;
    } catch (error) {
      throw error;
    }
  }

  async saveReportData(appId:string, reportData:any) {
    try {
      await this.checkIndex(appId);

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

  async getReportData(appId:string) {
    try {
      await this.checkIndex(appId);
      const { body: initialResponse } = await this.app.esClient.search({
        index: this.getEsIndexName(appId),
        // scroll: '1m', // 设置滚动时间
        body: {
          // from: 2, // 起始记录索引，从第一条记录开始
          query: {
            range: {
              '@timestamp': {
                gte: new Date('2023-12-20T08:18:27.029Z').getTime(),
                lte: new Date('2024-12-21T08:18:28.426Z').getTime(),
              },
            },
          },
          track_total_hits: true,
        },
      });
      return initialResponse;
    } catch (error) {
      this.app.logger.error(error);
    }
  }
}
