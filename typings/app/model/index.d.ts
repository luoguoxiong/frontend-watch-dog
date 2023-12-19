// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportApp from '../../../app/model/app';
import ExportPages from '../../../app/model/pages';

declare module 'egg' {
  interface IModel {
    App: ReturnType<typeof ExportApp>;
    Pages: ReturnType<typeof ExportPages>;
  }
}
