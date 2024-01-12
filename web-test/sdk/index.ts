import { onFID, onLCP, onFCP, onTTFB } from 'web-vitals/attribution';
import { getXmlHttpSend } from './utils';
interface PageMsg {
  /** 是否是首屏 */
  isFirst: boolean;
  /** 域名 */
  domain: string;
  /** 请求参数 */
  query: string;
  /** 网页链接 */
  pageUrl: string;
}

interface PageStatusReportMsg{
  type: 'pageStatus';
  /** 页面停留时间 */
  residence: number;
  /** 用户点击栈 */
  actionClickStack: string[];
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

type ResourceReportMsg = {
  type: 'resource';
  rescources: ResourceStatus[];
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

export type ReportItem =(
  | PerfamceReportMsg
  | ResourceReportMsg
  | PageStatusReportMsg
  | RequestReportMsg
  | JsErrorReportMsg
  | LoadResourceErrorReportMsg
) & PageMsg & {
  userTimeStamp?: number;
};

interface MonitorConfig{
  appId: string;
  cacheMax: number;
  webVitalsTimeouts?: number;
  report: (data: ReportItem[]) => void;
}

export class Monitor {
  config: MonitorConfig;

  performance: PerfamceReportMsg;

  curPage: PageMsg;

  firstPageMsg: PageMsg;

  resourceStatus: ResourceStatus[];

  reportStack: ReportItem[];

  constructor(config: MonitorConfig){
    this.config = {
      webVitalsTimeouts: 5000,
      ...config,
    };
    this.performance = {
      type: 'performance',
      dnsTime: -1,
      tcpTime: -1,
      whiteTime: -1,
      fcp: -1,
      ttfb: -1,
      lcp: -1,
      fid: -1,
    };

    this.curPage = this.firstPageMsg = {
      isFirst: true,
      pageUrl: location.pathname,
      domain: location.host,
      query: location.search,
    };

    this.reportStack = [];

    this.resourceStatus = [];

    const startTime = window.performance.now();
    this.caughtError();
    this.resetXmlHttp();
    this.resetFetch();
    window.onload = async() => {
      const endTime = window.performance.now();
      this.performance.whiteTime = endTime - startTime;
      this.resourceStatus = this.getEnteries();
      this.toReport({
        type: 'resource',
        ...this.firstPageMsg,
        rescources: this.getEnteries(),
      });
      await this.getWebPerformance();
    };
  }

  private toReport(data: ReportItem){
    data.userTimeStamp = new Date().getTime();
    this.reportStack.push(data);
    const { report, cacheMax } = this.config;
    if(cacheMax <= this.reportStack.length){
      const reportData = this.reportStack.splice(0, cacheMax);
      report(reportData);
    }
  }

  // 获取页面性能指标
  async getWebPerformance() {
    const [{ domainLookupEnd, domainLookupStart, connectEnd, connectStart }] = window.performance.getEntriesByType('navigation');
    this.performance.dnsTime = domainLookupEnd - domainLookupStart;
    this.performance.tcpTime = connectEnd - connectStart;
    const getWebvitals = (fn: (data: any) => void): Promise<number> => new Promise((resolve) => {
      const timerId = setTimeout(() => {
        resolve(-1);
      }, this.config.webVitalsTimeouts);
      fn((data) => {
        clearTimeout(timerId);
        resolve(data.value);
      });
    });
    this.performance.fcp = await getWebvitals(onFCP);
    this.performance.ttfb = await getWebvitals(onTTFB);
    this.performance.lcp = await getWebvitals(onLCP);
    this.performance.fid = await getWebvitals(onFID);
    this.toReport({
      type: 'performance',
      ...this.firstPageMsg,
      ...this.performance,
    });
  }

  // 获取资源加载时间
  getEnteries() {
    const resources = window.performance.getEntriesByType('resource');
    return resources.map((item) => ({
      resource: item.name,
      duration: item.duration,
      size: item.decodedBodySize,
      type: item.initiatorType,
    }));
  }
  // 捕获异常
  caughtError() {
    const monitor = this;
    window.addEventListener(
      'error',
      (error: ErrorEvent | Event) => {
        if(error instanceof ErrorEvent){
          console.log(error);
          monitor.toReport({
            ...monitor.curPage,
            type: 'jsError',
            message: error.message,
            stack: error.error.stack,
            colno: error.colno,
            lineno: error.lineno,
            filename: error.filename,
          });
        }else{
          const { type, target } = error as any;
          monitor.toReport({
            ...monitor.curPage,
            type: 'loadResourceError',
            resourceType: type,
            resourceUrl: target.src,
          });
        }
      },
      true
    );

    // 捕获promise reject
    window.addEventListener('unhandledrejection', (error) => {
      error.preventDefault();
      console.log(error);
      return true;
    });
  }
  // 重写xmlhttp请求
  resetXmlHttp() {
    if (!window.XMLHttpRequest) return;
    const xmlhttp = window.XMLHttpRequest;

    const monitor = this;

    const originOpen = xmlhttp.prototype.open;

    xmlhttp.prototype.open = function(...args) {
      const xml = this as XMLHttpRequest;
      const config: RequestReportMsg = {
        type: 'request',
        url: args[1],
        method: args[0],
        reqHeaders: '',
        reqBody: '',
        status: 0,
        requestType: 'done',
        cost: 0,
      };

      let startTime;

      const originSend = xml.send;

      const originSetRequestHeader = xml.setRequestHeader;

      const requestHeader = {};
      xml.setRequestHeader = function(key: string, val: string) {
        requestHeader[key] = val;
        return originSetRequestHeader.apply(xml, [key, val]);
      };

      xml.send = function(args: Document | XMLHttpRequestBodyInit){
        config.reqBody = getXmlHttpSend(args);
        return originSend.apply(xml, [args]);
      };

      xml.addEventListener('readystatechange', function(ev: Event){
        if(this.readyState === XMLHttpRequest.DONE){
          config.status = this.status;
          config.cost = performance.now() - startTime;
          config.reqHeaders = JSON.stringify(requestHeader);
          config.requestType = this.status === 0 ? 'error' : 'done';
          monitor.toReport({
            type: 'request',
            ...monitor.curPage,
            ...config,
          });
        }
      });
      xml.addEventListener('loadstart', function(data: ProgressEvent<XMLHttpRequestEventTarget>){
        startTime = performance.now();
      });
      xml.addEventListener('error', function(data: ProgressEvent<XMLHttpRequestEventTarget>){
        config.requestType = 'error';
        config.status = this.status;
        config.cost = performance.now() - startTime;
        config.reqHeaders = JSON.stringify(requestHeader);
        monitor.toReport({
          type: 'request',
          ...monitor.curPage,
          ...config,
        });
      });
      xml.addEventListener('timeout', function(data: ProgressEvent<XMLHttpRequestEventTarget>){
        config.requestType = 'timeout';
        config.status = this.status;
        config.cost = performance.now() - startTime;
        config.reqHeaders = JSON.stringify(requestHeader);
        monitor.toReport({
          type: 'request',
          ...monitor.curPage,
          ...config,
        });
      });
      return originOpen.apply(this, args);
    };
  }
  // 重写fetch请求
  resetFetch() {
    const _oldFetch = window.fetch;
    window.fetch = (...args) => {
      const [url, { method, headers, body }] = args;
      const startTime = performance.now();
      const data: RequestReportMsg = {
        type: 'request',
        url: url as string,
        method: method,
        reqHeaders: headers ? JSON.stringify(headers) : '',
        reqBody: body ? getXmlHttpSend(body) : '',
        status: 0,
        requestType: 'done',
        cost: 0,
      };
      return new Promise((resolve, reject) => {
        _oldFetch
          .apply(window, args)
          .then((res) => {
            const endTime = performance.now();
            data.cost = endTime - startTime;
            data.status = res.status;
            data.requestType = res.ok ? 'done' : 'error';
            this.toReport({
              type: 'request',
              ...this.curPage,
              ...data,
            });
            resolve(res);
          })
          .catch((error: any) => {
            const endTime = performance.now();
            data.cost = endTime - startTime;
            data.status = 0;
            data.requestType = 'error';
            this.toReport({
              type: 'request',
              ...this.curPage,
              ...data,
            });
            reject(error);
          });
      });
    };
  }
}

