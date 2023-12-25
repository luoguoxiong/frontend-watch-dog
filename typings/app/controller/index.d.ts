// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportApp from '../../../app/controller/app';
import ExportPerformance from '../../../app/controller/performance';
import ExportReport from '../../../app/controller/report';

declare module 'egg' {
  interface IController {
    app: ExportApp;
    performance: ExportPerformance;
    report: ExportReport;
  }
}
