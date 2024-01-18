import { Service } from 'egg';

import { createIndexName } from '@/app/utils';

export default class ReportEsService extends Service {

  private getEsIndexName = (appId: string) => createIndexName(this.app.config.appIndexName.page_report, appId);

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
              cost: { type: 'keyword' },
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


  async analyzePageTrafficStats(appId: string, beginTime: number, endTime: number, groupKey?: string) {
    console.log(beginTime, endTime);

    const esQuery = {
      index: this.getEsIndexName(appId),
      body: {
        size: 0,
        aggs: {
          grouped_data: {
            terms: {
              field: 'pageUrl', // 第一个字段
              size: 2147483647,
            },
            aggs: {},
          },
        },
        query: {
          'bool': {
            'must': [
              {
                'term': {
                  'type': 'pageStatus',
                },
              },
            ],
            'filter': [
              {
                'range': {
                  '@timestamp': {
                    gte: new Date(beginTime),
                    lte: new Date(endTime),
                  },
                },
              },
            ],
          },
        },
        track_total_hits: true,
      },
    };
    if (groupKey) {
      esQuery.body.aggs.grouped_data.aggs = {
        data: {
          terms: {
            field: `${groupKey}`, // 第一个字段
            size: 2147483647,
          },
        },
      };
      const { body } = await this.app.esClient.search(esQuery);
      const data = body.aggregations.grouped_data.buckets;

      return data.map((item) => ({
        pageUrl: item.key,
        count: item.data.buckets.length,
      }));
    }
    const { body } = await this.app.esClient.search(esQuery);
    const data = body.aggregations.grouped_data.buckets;
    return data.map((item) => ({
      pageUrl: item.key,
      count: item.doc_count,
    }));
  }

  async analyzeAppTrafficStats(appId: string, beginTime: number, endTime: number, groupKey?: string) {
    const esQuery = {
      index: this.getEsIndexName(appId),
      body: {
        size: 0,
        aggs: {},
        query: {
          'bool': {
            'must': [
              {
                'term': {
                  'type': 'pageStatus',
                },
              },
            ],
            'filter': [
              {
                'range': {
                  '@timestamp': {
                    gte: new Date(beginTime),
                    lte: new Date(endTime),
                  },
                },
              },
            ],
          },
        },
        track_total_hits: true,
      },
    };
    if (groupKey) {
      esQuery.body.aggs = {
        grouped_data: {
          terms: {
            field: `${groupKey}`,
            size: 2147483647,
          },
        },
      };
      const { body } = await this.app.esClient.search(esQuery);
      const data = body.aggregations.grouped_data.buckets;
      return data.length;
    }
    const { body } = await this.app.esClient.search(esQuery);
    return body.hits.total.value;
  }
}
