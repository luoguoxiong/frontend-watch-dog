// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportRead from '../../../app/model/read';

declare module 'egg' {
  interface IModel {
    Read: ReturnType<typeof ExportRead>;
  }
}
