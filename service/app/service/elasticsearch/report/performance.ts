
import { SearchPerformanceReq } from './reportType';
import ReportBaseEsService from './index';
export default class ReportPerformanceEsService extends ReportBaseEsService {

  private getPublicAvgQuery(){
    const keys = ['dnsTime', 'tcpTime', 'whiteTime', 'fcp', 'ttfb', 'lcp', 'fid'];
    const aggs = keys.reduce((prev: object, cur: string) => {
      prev[cur] = {
        avg: {
          field: cur,
        },
      };
      return prev;
    }, {});
    return aggs;
  }

  async getPageAvgPerformance(appId: string, beginTime: string, endTime: string){
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
                    'value': 'performance',
                  },
                },
              },
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
          'grouped_data': {
            'terms': {
              'field': 'pageUrl',
              'size': 10000,
            },
            'aggs': this.getPublicAvgQuery(),
          },
        },
      },
    };
    const { body } = await this.app.esClient.search(query);
    const avgData = body?.aggregations?.grouped_data?.buckets || [];
    return avgData;
  }
  async getAppAvgPerformance(appId: string){
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
                    'value': 'performance',
                  },
                },
              },
            ],
          },
        },
        'aggs': this.getPublicAvgQuery(),
      },
    };
    const { body } = await this.app.esClient.search(query);
    return body.aggregations;
  }

  async getPerformance(appId: string, query: SearchPerformanceReq){
    const { pageUrl, beginTime, endTime, whiteTime, from, size, sorterName, sorterKey } = query;
    const esQuery = {
      index: this.getEsIndexName(appId),
      body: {
        from: from * size,
        size,
        'query': {
          'bool': {
            'must': [
              {
                'term': {
                  'type': {
                    'value': 'performance',
                  },
                },
              },
            ],
            'filter': [],
          },
        },
        'track_total_hits': true,
        sort: [],
      },
    };
    const esFilters = esQuery.body.query.bool.filter as any[];
    if(pageUrl){
      esFilters.push({
        'wildcard': {
          'pageUrl': {
            'value': `*${pageUrl}*`,
          },
        },
      });
    }

    if(beginTime && endTime){
      esFilters.push({
        'range': {
          '@timestamp': {
            'gte': beginTime,
            'lte': endTime,
          },
        },
      });
    }


    const enumWhiteTimeRange = {
      1: [0, 1000],
      2: [ 1001, 2000],
      3: [2001, 3000],
      4: [3001, 3000000],
    };
    if(whiteTime && whiteTime in enumWhiteTimeRange){
      const [beginTime, endTime] = enumWhiteTimeRange[whiteTime];
      esFilters.push({
        'range': {
          'whiteTime': {
            'gte': beginTime,
            'lte': endTime,
          },
        },
      });
    }

    if(sorterName && sorterKey){
      const sort = esQuery.body.sort as any[];
      sort.push( {
        [sorterName]: {
          'order': sorterKey,
        },
      });
    }

    const { body } = await this.app.esClient.search(esQuery);

    return {
      total: body.hits.total.value,
      data: body.hits.hits,
    };
  }
}
