
import ReportBaseEsService from './index';

export default class ReportTrafficService extends ReportBaseEsService {

  async analyzePageTrafficStats(appId: string, beginTime: number, endTime: number, groupKey?: string) {
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
