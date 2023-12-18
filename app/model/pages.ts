import * as sequelize from 'sequelize';

export interface PageModelIn {
  /** 应用AppId */
  appId:string
  /** 是否是首屏 */
  isFirst:boolean
  /** 访问Url路径 */
  pageUrl:string
  /** 访问的域名 */
  origin?:string
  /** 用户ID */
  userId?:string
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
    type: sequelize.BLOB,
    defaultValue: false,
    allowNull: false,
    comment: '是否是首屏',
  },
  origin: {
    type: sequelize.STRING,
    comment: '访问的域名',
  },
  pageUrl: {
    type: sequelize.STRING,
    allowNull: false,
    comment: '访问Url路径',
  },
  userId: {
    type: sequelize.STRING(20),
    comment: '用户ID',
  },
  loadTime: {
    type: sequelize.INTEGER(),
    comment: '页面加时长',
  },
  dnsTime: {
    type: sequelize.INTEGER(),
    comment: '页面Dns解析时长',
  },
  tcpTime: {
    type: sequelize.INTEGER(),
    comment: '页面TCP链接时长',
  },
  whiteTime: {
    type: sequelize.INTEGER(),
    comment: '页面白屏时间',
  },
  domTime: {
    type: sequelize.INTEGER(),
    comment: 'dom渲染时间',
  },
  fetchTime: {
    type: sequelize.INTEGER(),
    comment: '页面准备时间',
  },
  reirectTime: {
    type: sequelize.INTEGER(),
    comment: '页面重定向时间',
  },
  requestTime: {
    type: sequelize.INTEGER(),
    comment: '页面请求完成时间',
  },
  createdAt: {
    type: sequelize.DATE,
    comment: '创建日期',
  },
};
