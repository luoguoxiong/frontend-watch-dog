
import dayjs from 'dayjs';
import ReportBaseEsService from './index';
export default class ReportHttpErrorEsService extends ReportBaseEsService {

  async getHttpErrorRank(appId: string, beginTime: string, endTime: string){
    const query = {
      index: this.getEsIndexName(appId),
      body: {
        'size': 0,
        'query': {
          'bool': {
            'must': [
              {
                'term': {
                  'type': {
                    'value': 'request',
                  },
                },
              },
              {
                'term': {
                  'requestType': {
                    'value': 'error',
                  },
                },
              },
            ],
            'filter': [
              {
                'range': {
                  '@timestamp': {
                    'gte': new Date(beginTime),
                    'lte': new Date(endTime),
                  },
                },
              },
            ],
          },
        },
        'aggs': {
          'data': {
            'composite': {
              'size': 10000,
              'sources': [
                { 'type': { 'terms': { 'field': 'type' } } },
                { 'url': { 'terms': { 'field': 'url' } } },
                { 'method': { 'terms': { 'field': 'method' } } },
              ],
            },
            'aggs': {
              // 根据分组数量排序
              'doc_count_sort': {
                'bucket_sort': {
                  'sort': [{ '_count': { 'order': 'desc' } }],
                  'size': 10000,
                },
              },
              // 查询具体的数据 支持分页
              // 'top_docs': {
              //   'top_hits': {
              //     'size': 1,
              //   },
              // },
            },
          },
        },
        'track_total_hits': true,
      },
    };
    const { body } = await this.app.esClient.search(query);
    return body.aggregations.data.buckets;
  }

  async getHttpDoneRank(appId: string, beginTime: string, endTime: string){
    const query = {
      index: this.getEsIndexName(appId),
      body: {
        'size': 0,
        'query': {
          'bool': {
            'must': [
              {
                'term': {
                  'type': {
                    'value': 'request',
                  },
                },
              },
              {
                'term': {
                  'requestType': {
                    'value': 'done',
                  },
                },
              },
            ],
            'filter': [
              {
                'range': {
                  '@timestamp': {
                    'gte': new Date(beginTime),
                    'lte': new Date(endTime),
                  },
                },
              },
            ],
          },
        },
        'aggs': {
          'data': {
            'composite': {
              'size': 50,
              'sources': [
                { 'url': { 'terms': { 'field': 'url' } } },
                { 'type': { 'terms': { 'field': 'type' } } },
                { 'method': { 'terms': { 'field': 'method' } } },
              ],
            },
            'aggs': {
              'avg_cost': {
                'avg': {
                  'field': 'cost',
                },
              },
              'sort_avg': {
                'bucket_sort': {
                  'sort': [{ 'avg_cost': { 'order': 'desc' } }],
                  'size': 50,
                },
              },
            },
          },
        },
      },
    };
    const { body } = await this.app.esClient.search(query);
    return body.aggregations.data.buckets;
  }

  async getOneDayHttpErrorCount(appId: string, date: string){
    const query = {
      index: this.getEsIndexName(appId),
      body: {
        'size': 0,
        'query': {
          'bool': {
            'must': [
              {
                'term': {
                  'type': {
                    'value': 'request',
                  },
                },
              },
              {
                'term': {
                  'requestType': {
                    'value': 'error',
                  },
                },
              },
            ],
            'filter': [
              {
                'range': {
                  '@timestamp': {
                    'gte': dayjs(dayjs(date).format('YYYY-MM-DD 00:00:00')),
                    'lte': dayjs(dayjs(date).format('YYYY-MM-DD 23:59:59')),
                  },
                },
              },
            ],
          },
        },
        'track_total_hits': true,
      },
    };
    const { body } = await this.app.esClient.search(query);
    return body.hits.total.value;
  }
}
