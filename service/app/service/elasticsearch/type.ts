export interface TrafficStatsIn{
  pageUrl:string
  count:number
}

export interface TrafficStatsRes{
  trafficPvStats:TrafficStatsIn[]
  trafficUvStats:TrafficStatsIn[]
  trafficIpStats:TrafficStatsIn[]
}

export type PageStats = Record<string, {
  pageUrl:string,
  pageViews: number,
  uniqueVisitors: number,
  uniqueIPsCount: number,
}>;

export interface PageStatsResult{
  pageUrl: string;
  pageViews: number;
  uniqueVisitors: number;
  uniqueIPsCount: number;
}

export interface TrafficStatsTimeQuery {
  beginTime: number;
  endTime: number;
}
export interface TrafficStatsQuery extends TrafficStatsTimeQuery {
  appId: string;
}

export interface PageModelIn {
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
  createdAt?: string
  updatedAt?:string
}
