// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExtendTypeContext from '../../../app/extend/context.type';
type ExtendTypeContextType = typeof ExtendTypeContext;
declare module 'egg' {
  interface Context extends ExtendTypeContextType { }
}