// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportPages from '../../../app/model/pages';

declare module 'egg' {
  interface IModel {
    Pages: ReturnType<typeof ExportPages>;
  }
}
