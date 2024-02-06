
import dayjs from 'dayjs';
import ReportBaseEsService from './index';
export default class ReportJsErrorEsService extends ReportBaseEsService {

  async getOneDayJsErrorCount(appId: string, date: string){
    const query = {
      index: this.getEsIndexName(appId),
      body: {
        'size': 0,
        'query': {
          'bool': {
            'must': [],
            'filter': [
              {
                'terms': {
                  'type': ['jsError', 'loadResourceError', 'rejectError'],
                },
              },
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

  async getJsErrorList(appId: string, beginTime: string, endTime: string){
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
                    'value': 'jsError',
                  },
                },
              },
            ],
            'filter': [
              {
                'range': {
                  '@timestamp': {
                    'gte': dayjs(dayjs(beginTime).format('YYYY-MM-DD 00:00:00')),
                    'lte': dayjs(dayjs(endTime).format('YYYY-MM-DD 23:59:59')),
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
                {
                  'colno': {
                    'terms': {
                      'field': 'colno',
                    },
                  },
                },
                {
                  'stack': {
                    'terms': {
                      'field': 'stack',
                    },
                  },
                },

                {
                  'filename': {
                    'terms': {
                      'field': 'filename',
                    },
                  },
                },
                {
                  'lineno': {
                    'terms': {
                      'field': 'lineno',
                    },
                  },
                },
                {
                  'message': {
                    'terms': {
                      'field': 'message',
                    },
                  },
                },
              ],
            },
            'aggs': {
              'markUserId': {
                'terms': {
                  'field': 'markUserId',
                  'size': 10000,
                },
              },
              'doc_count_order': {
                'bucket_sort': {
                  'sort': [
                    {
                      '_count': {
                        'order': 'desc',
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        'track_total_hits': true,
      },
    };
    const { body } = await this.app.esClient.search(query);
    const buckets = body.aggregations.data.buckets;
    const data = buckets.map(({ key, markUserId, doc_count }) => ({
      ...key,
      userIds: markUserId.buckets.map((item) => item.key),
      errorCount: doc_count,
    }));
    return data;
  }

}
