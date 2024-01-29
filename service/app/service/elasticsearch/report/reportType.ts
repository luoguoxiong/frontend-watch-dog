interface PageMsg {
  /** 是否是首屏 */
  isFirst?: boolean;
  /** 域名 */
  domain: string;
  /** 网页链接 */
  pageUrl: string;
}

interface PageStatus{
  /** 页面进入时间 */
  inTime: number;
  /** 离开页面时间 */
  leaveTime: number;
  /** 页面停留时间 */
  residence: number;
}

interface ClickReportMsg{
  type: 'click';
  clickElement: string;
}

interface PerfamceReportMsg{
  type: 'performance';
  /** 页面Dns解析时长 */
  dnsTime: number;
  /** 页面TCP链接时长 */
  tcpTime: number;
  /** 页面白屏时间 */
  whiteTime: number;
  /** 首次内容 */
  fcp: number;
  /** 首字节时间 */
  ttfb: number;
  /** 最大内容绘制 */
  lcp: number;
  /** 用户首次与页面交互 */
  fid: number;
  rescources: ResourceStatus[];
}

interface ResourceStatus{
  /** 资源链接 */
  resource: string;
  /** 资源请求耗时 */
  duration: number;
  /** 资源大小 */
  size: number;
  /** 资源类型 */
  type: string;
}
type RequestReportMsg = {
  type: 'request';
  url: string;
  method: string;
  reqHeaders: string;
  reqBody: string;
  status: number;
  requestType: 'done' | 'error' | 'timeout';
  cost: number;
}

type JsErrorReportMsg = {
  type: 'jsError';
  message: string;
  colno: number;
  lineno: number;
  stack: string;
  filename: string;
}

type LoadResourceErrorReportMsg = {
  type: 'loadResourceError';
  resourceType: string;
  resourceUrl: string;
}

type RejectErrorReportMsg = {
  type: 'rejectError';
  reason: 'string';
}

interface PageStatusReportMsg extends PageStatus{
  type: 'pageStatus';
}

interface UaMsg{
  /** 浏览器名称 */
  browserName?: string;
  /** 浏览器版本号 */
  browserVersion?: string;
  /** 浏览器主版本 */
  browserMajors?: string;
  /** 系统名称 */
  osName?: string;
  /** 系统版本号 */
  osVersion?: string;
  /** 设备名称 */
  deviceVendor?: string;
  /** 设备模型 */
  deviceModel?: string;
  ua?: string;
}
interface IpMsg{
  ip?: string;
  province?: string;
  city?: string;
  country?: string;
}
export type ReportItem =(
  | PerfamceReportMsg
  | PageStatusReportMsg
  | RequestReportMsg
  | JsErrorReportMsg
  | LoadResourceErrorReportMsg
  | RejectErrorReportMsg
  | ClickReportMsg
) & PageMsg & {
  userTimeStamp: number;
  markUserId: string;
  userId: string;
  appId: string;
} & UaMsg & IpMsg;

export interface SearchPerformanceReq{
  from: number;
  size: number;
  pageUrl?: string | undefined;
  beginTime?: Date | undefined;
  endTime?: Date | undefined;
  /** 1:1s以内 2:1~2s 3:2~3s 4:3s以上 */
  whiteTime?: 1 | 2 | 3 | 4 | undefined;
  sorterName: string;
  sorterKey: string;
}

export interface SearchHttpReq{
  from: number;
  size: number;
  url?: string | undefined;
  link?: string| undefined;
  beginTime?: Date | undefined;
  endTime?: Date | undefined;
  sorterName: string;
  sorterKey: string;
  requestType?: 'done' | 'error' | string;
}
