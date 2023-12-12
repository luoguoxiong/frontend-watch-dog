// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import { EggAppConfig } from 'egg';
import ExportConfigDefault from '../../config/config.default';
type ConfigDefault = ReturnType<typeof ExportConfigDefault>;
type NewEggAppConfig = ConfigDefault;
declare module 'egg' {
  interface EggAppConfig extends NewEggAppConfig { }
}