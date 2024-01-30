// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportElasticsearchIndex from '../../../app/service/elasticsearch/index';
import ExportElasticsearchPages from '../../../app/service/elasticsearch/pages';
import ExportElasticsearchTrafficStats from '../../../app/service/elasticsearch/trafficStats';
import ExportElasticsearchType from '../../../app/service/elasticsearch/type';
import ExportKafukaIndex from '../../../app/service/kafuka/index';
import ExportKafukaReport from '../../../app/service/kafuka/report';
import ExportKafukaType from '../../../app/service/kafuka/type';
import ExportRedisCache from '../../../app/service/redis/cache';
import ExportRedisDayNewUsers from '../../../app/service/redis/dayNewUsers';
import ExportRedisEveryDayActiveUsers from '../../../app/service/redis/everyDayActiveUsers';
import ExportRedisEveryDayHttpError from '../../../app/service/redis/everyDayHttpError';
import ExportRedisEveryDayIps from '../../../app/service/redis/everyDayIps';
import ExportRedisEveryDayJsError from '../../../app/service/redis/everyDayJsError';
import ExportRedisEveryDayPv from '../../../app/service/redis/everyDayPv';
import ExportRedisTop from '../../../app/service/redis/top';
import ExportElasticsearchReportHttpError from '../../../app/service/elasticsearch/report/httpError';
import ExportElasticsearchReportIndex from '../../../app/service/elasticsearch/report/index';
import ExportElasticsearchReportJsError from '../../../app/service/elasticsearch/report/jsError';
import ExportElasticsearchReportPerformance from '../../../app/service/elasticsearch/report/performance';
import ExportElasticsearchReportReportType from '../../../app/service/elasticsearch/report/reportType';
import ExportElasticsearchReportTrafficStats from '../../../app/service/elasticsearch/report/trafficStats';
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
      pages: AutoInstanceType<typeof ExportElasticsearchPages>;
      trafficStats: AutoInstanceType<typeof ExportElasticsearchTrafficStats>;
      type: AutoInstanceType<typeof ExportElasticsearchType>;
      report: {
        httpError: AutoInstanceType<typeof ExportElasticsearchReportHttpError>;
        index: AutoInstanceType<typeof ExportElasticsearchReportIndex>;
        jsError: AutoInstanceType<typeof ExportElasticsearchReportJsError>;
        performance: AutoInstanceType<typeof ExportElasticsearchReportPerformance>;
        reportType: AutoInstanceType<typeof ExportElasticsearchReportReportType>;
        trafficStats: AutoInstanceType<typeof ExportElasticsearchReportTrafficStats>;
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
      everyDayHttpError: AutoInstanceType<typeof ExportRedisEveryDayHttpError>;
      everyDayIps: AutoInstanceType<typeof ExportRedisEveryDayIps>;
      everyDayJsError: AutoInstanceType<typeof ExportRedisEveryDayJsError>;
      everyDayPv: AutoInstanceType<typeof ExportRedisEveryDayPv>;
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
