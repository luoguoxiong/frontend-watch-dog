// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportApp from '../../../app/service/app';
import ExportPerformance from '../../../app/service/performance';
import ExportReport from '../../../app/service/report';
import ExportTrafficStats from '../../../app/service/trafficStats';
import ExportType from '../../../app/service/type';

declare module 'egg' {
  interface IService {
    app: AutoInstanceType<typeof ExportApp>;
    performance: AutoInstanceType<typeof ExportPerformance>;
    report: AutoInstanceType<typeof ExportReport>;
    trafficStats: AutoInstanceType<typeof ExportTrafficStats>;
    type: AutoInstanceType<typeof ExportType>;
  }
}
