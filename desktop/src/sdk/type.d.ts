interface PageMsg {
  /** 是否是首屏 */
  isFirst?: boolean;
  /** 域名 */
  domain: string;
  /** 网页链接 */
  pageUrl: string;
  /** 请求参数 */
  query: string;
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
  /** 资源加载数据 */
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
  requestType: 'done' | 'error';
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

type ReportItem =(
  | PerfamceReportMsg
  | PageStatusReportMsg
  | RequestReportMsg
  | JsErrorReportMsg
  | LoadResourceErrorReportMsg
  | RejectErrorReportMsg
  | ClickReportMsg
) & PageMsg & {
  userTimeStamp?: number;
  markUserId?: string;
  userId?: string;
  appId?: string;
};


interface MonitorConfig{
  appId: string;
  cacheMax: number;
  webVitalsTimeouts?: number;
  api: string;
}
interface Historys {
  back(): void;
  forward(): void;
  go(delta?: number): void;
  pushState(data: any, title: string, url?: string | null): void;
  replaceState(data: any, title: string, url?: string | null): void;
}

type Listener = () => void
