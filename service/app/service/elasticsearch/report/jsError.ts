
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

}
