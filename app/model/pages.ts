import * as sequelize from 'sequelize';
import { PublicTimeIn } from './type';
export interface PageModelIn extends PublicTimeIn {
  /** 应用AppId */
  appId:string
  /** 是否是首屏 0 否 1 是 */
  isFirst:0 | 1
  /** 访问Url路径 */
  pageUrl:string
  /** 访问的域名 */
  origin?:string
  /** 用户ID */
  userId?:string
  /** ip地址 */
  ip?:string
  /** 浏览器名称 */
  browserName?:string
  /** 浏览器版本号 */
  browserVersion?:string
  /** 浏览器主版本 */
  browserMajors?:string
  /** 系统名称 */
  osName?:string
  /** 系统版本号 */
  osVersion?:string
  /** 设备名称 */
  deviceVendor?:string
  /** 设备模型 */
  deviceModel?:string
  /** 页面加时长 */
  loadTime?:number
  /** 页面Dns解析时长 */
  dnsTime?:number
  /** 页面TCP链接时长 */
  tcpTime?:number
  /** 页面白屏时间 */
  whiteTime?:number
  /** dom渲染时间 */
  domTime?:number
  /** 页面准备时间 */
  fetchTime?:number
  /** 页面重定向时间 */
  reirectTime?:number
  /** 页面请求完成时间 */
  requestTime?:number
}

export const pagesModel:sequelize.ModelAttributes = {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  appId: {
    type: sequelize.STRING,
    allowNull: false,
    comment: '应用AppId',
  },
  isFirst: {
    type: sequelize.INTEGER(),
    defaultValue: false,
    allowNull: false,
    comment: '是否是首屏 0 否 1 是',
  },
  origin: {
    type: sequelize.STRING,
    defaultValue: null,
    comment: '访问的域名',
  },
  pageUrl: {
    type: sequelize.STRING,
    allowNull: false,
    comment: '访问Url路径',
  },
  userId: {
    type: sequelize.STRING(20),
    defaultValue: null,
    comment: '用户ID',
  },
  ip: {
    type: sequelize.STRING(15),
    defaultValue: null,
    comment: 'ip地址',
  },
  browserName: {
    type: sequelize.STRING(15),
    defaultValue: null,
    comment: '浏览器名称',
  },
  browserVersion: {
    type: sequelize.STRING(15),
    defaultValue: null,
    comment: '浏览器版本号',
  },
  browserMajor: {
    type: sequelize.STRING(15),
    defaultValue: null,
    comment: '浏览器主版本',
  },
  osName: {
    type: sequelize.STRING(15),
    defaultValue: null,
    comment: '系统名称',
  },
  osVersion: {
    type: sequelize.STRING(15),
    defaultValue: null,
    comment: '系统版本号',
  },
  deviceVendor: {
    type: sequelize.STRING(15),
    defaultValue: null,
    comment: '设备名称',
  },
  deviceModel: {
    type: sequelize.STRING(15),
    defaultValue: null,
    comment: '设备模型',
  },
  loadTime: {
    type: sequelize.INTEGER(),
    defaultValue: null,
    comment: '页面加时长',
  },
  dnsTime: {
    type: sequelize.INTEGER(),
    defaultValue: null,
    comment: '页面Dns解析时长',
  },
  tcpTime: {
    type: sequelize.INTEGER(),
    defaultValue: null,
    comment: '页面TCP链接时长',
  },
  whiteTime: {
    type: sequelize.INTEGER(),
    defaultValue: null,
    comment: '页面白屏时间',
  },
  domTime: {
    type: sequelize.INTEGER(),
    defaultValue: null,
    comment: 'dom渲染时间',
  },
  fetchTime: {
    type: sequelize.INTEGER(),
    comment: '页面准备时间',
  },
  reirectTime: {
    type: sequelize.INTEGER(),
    defaultValue: null,
    comment: '页面重定向时间',
  },
  requestTime: {
    type: sequelize.INTEGER(),
    defaultValue: null,
    comment: '页面请求完成时间',
  },
  createdAt: {
    type: sequelize.DATE,
    defaultValue: null,
    comment: '创建日期',
  },
};
