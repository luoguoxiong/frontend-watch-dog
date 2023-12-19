// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportApp from '../../../app/service/app';
import ExportPvuvSchedule from '../../../app/service/pvuvSchedule';
import ExportReport from '../../../app/service/report';

declare module 'egg' {
  interface IService {
    app: AutoInstanceType<typeof ExportApp>;
    pvuvSchedule: AutoInstanceType<typeof ExportPvuvSchedule>;
    report: AutoInstanceType<typeof ExportReport>;
  }
}
