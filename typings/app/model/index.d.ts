// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportApp from '../../../app/model/app';
import ExportPages from '../../../app/model/pages';
import ExportTraffic from '../../../app/model/traffic';
import ExportType from '../../../app/model/type';

declare module 'egg' {
  interface IModel {
    App: ReturnType<typeof ExportApp>;
    Pages: ReturnType<typeof ExportPages>;
    Traffic: ReturnType<typeof ExportTraffic>;
    Type: ReturnType<typeof ExportType>;
  }
}
