// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportVerifyUser from '../../../app/middleware/verifyUser';

declare module 'egg' {
  interface IMiddleware {
    verifyUser: typeof ExportVerifyUser;
  }
}
