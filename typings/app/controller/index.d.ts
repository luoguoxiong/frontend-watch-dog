// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    home: ExportHome;
  }
}
