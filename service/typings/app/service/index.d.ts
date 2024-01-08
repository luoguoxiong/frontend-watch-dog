// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportElasticsearchIndex from '../../../app/service/elasticsearch/index';
import ExportKafukaIndex from '../../../app/service/kafuka/index';
import ExportKafukaReport from '../../../app/service/kafuka/report';
import ExportKafukaType from '../../../app/service/kafuka/type';
import ExportRedisCache from '../../../app/service/redis/cache';
import ExportRedisDayNewUsers from '../../../app/service/redis/dayNewUsers';
import ExportRedisEveryDayActiveUsers from '../../../app/service/redis/everyDayActiveUsers';
import ExportRedisTop from '../../../app/service/redis/top';
import ExportElasticsearchPagesIndex from '../../../app/service/elasticsearch/pages/index';
import ExportElasticsearchPagesType from '../../../app/service/elasticsearch/pages/type';
import ExportElasticsearchTrafficStatsIndex from '../../../app/service/elasticsearch/trafficStats/index';
import ExportElasticsearchTrafficStatsType from '../../../app/service/elasticsearch/trafficStats/type';
import ExportMysqlAppIndex from '../../../app/service/mysql/app/index';
import ExportMysqlAppType from '../../../app/service/mysql/app/type';
import ExportMysqlTrafficsIndex from '../../../app/service/mysql/traffics/index';
import ExportMysqlTrafficsType from '../../../app/service/mysql/traffics/type';
import ExportMysqlUserIndex from '../../../app/service/mysql/user/index';
import ExportMysqlUserType from '../../../app/service/mysql/user/type';

declare module 'egg' {
  interface IService {
    elasticsearch: {
      index: AutoInstanceType<typeof ExportElasticsearchIndex>;
      pages: {
        index: AutoInstanceType<typeof ExportElasticsearchPagesIndex>;
        type: AutoInstanceType<typeof ExportElasticsearchPagesType>;
      }
      trafficStats: {
        index: AutoInstanceType<typeof ExportElasticsearchTrafficStatsIndex>;
        type: AutoInstanceType<typeof ExportElasticsearchTrafficStatsType>;
      }
    }
    kafuka: {
      index: AutoInstanceType<typeof ExportKafukaIndex>;
      report: AutoInstanceType<typeof ExportKafukaReport>;
      type: AutoInstanceType<typeof ExportKafukaType>;
    }
    redis: {
      cache: AutoInstanceType<typeof ExportRedisCache>;
      dayNewUsers: AutoInstanceType<typeof ExportRedisDayNewUsers>;
      everyDayActiveUsers: AutoInstanceType<typeof ExportRedisEveryDayActiveUsers>;
      top: AutoInstanceType<typeof ExportRedisTop>;
    }
    mysql: {
      app: {
        index: AutoInstanceType<typeof ExportMysqlAppIndex>;
        type: AutoInstanceType<typeof ExportMysqlAppType>;
      }
      traffics: {
        index: AutoInstanceType<typeof ExportMysqlTrafficsIndex>;
        type: AutoInstanceType<typeof ExportMysqlTrafficsType>;
      }
      user: {
        index: AutoInstanceType<typeof ExportMysqlUserIndex>;
        type: AutoInstanceType<typeof ExportMysqlUserType>;
      }
    }
  }
}
