
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
                { 'requestType': { 'terms': { 'field': 'requestType' } } },
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
}
