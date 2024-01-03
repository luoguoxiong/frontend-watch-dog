// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAnalyse from '../../../app/controller/analyse';
import ExportApp from '../../../app/controller/app';
import ExportDesktop from '../../../app/controller/desktop';
import ExportPerformance from '../../../app/controller/performance';
import ExportReport from '../../../app/controller/report';

declare module 'egg' {
  interface IController {
    analyse: ExportAnalyse;
    app: ExportApp;
    desktop: ExportDesktop;
    performance: ExportPerformance;
    report: ExportReport;
  }
}
