import { onFID, onLCP, onFCP, onTTFB } from 'web-vitals/attribution';
import { _history } from './history';
import { generateShortUUID, getUrlQuery } from './utils';

export class Monitor {
  static config: MonitorConfig;

  private performance: PerfamceReportMsg;

  private firstPageMsg: PageMsg;

  private lastPageMsg: PageMsg;

  private curPageStatus: PageStatus;

  private reportStack: ReportItem[];

  private markUserId: string;

  static userId: string;

  constructor(config: MonitorConfig){
    Monitor.config = config;
    const markUserId = window.localStorage.getItem(`web-watch-dog-markUserId-${Monitor.config.appId}`);
    if(markUserId){
      this.markUserId = markUserId;
    }else{
      const id = generateShortUUID();
      window.localStorage.setItem(`web-watch-dog-markUserId-${Monitor.config.appId}`, id );
      this.markUserId = id;
    }

    Monitor.userId = window.localStorage.getItem(`web-watch-dog-userId-${Monitor.config.appId}`);

    this.performance = {
      type: 'performance',
      dnsTime: 0,
      tcpTime: 0,
      whiteTime: 0,
      fcp: 0,
      ttfb: 0,
      lcp: 0,
      fid: 0,
      rescources: [],
    };

    this.firstPageMsg = Object.assign({ isFirst: true }, getUrlQuery());

    this.reportStack = [];

    this.caughtError();

    this.resetXmlHttp();

    this.resetFetch();

    this.catchRouterChange();

    this.lastPageMsg = Object.assign({ isFirst: false }, getUrlQuery());

    this.curPageStatus = {
      inTime: new Date().getTime(),
      leaveTime: 0,
      residence: 0,
    };

    window.addEventListener('load', async() => {
      const endTime = window.performance.now();
      const [data] = window.performance.getEntriesByType('navigation');
      this.performance.whiteTime = endTime - data.startTime;
      this.getWebPerformance();
    });

    window.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const getTagMsg = (tag) => {
        if(tag){
          const className = tag.getAttribute('class');
          const id = tag.getAttribute('id');
          const tagName = tag.tagName.toLocaleLowerCase();
          return `${tagName}${id ? `#${id}` : ''}${className ? `.${className}` : ''}`;
        }
      };

      const track = [getTagMsg(target)];
      let curTarget = event.target as any;
      while(curTarget && curTarget.parentNode !== document){
        track.unshift(getTagMsg(curTarget.parentNode));
        curTarget = curTarget.parentNode;
      }

      this.toReport({
        type: 'click',
        clickElement: track.join('>'),
        ...this.getPageMsg(),
      });
    }, true);

    window.onbeforeunload = () => {
      const { api } = Monitor.config;
      const img = document.createElement('img');
      const curTime = new Date().getTime();
      this.reportStack.push({
        type: 'pageStatus',
        appId: Monitor.config.appId,
        userTimeStamp: new Date().getTime(),
        markUserId: this.markUserId,
        userId: Monitor.userId,
        ...this.lastPageMsg,
        ...{
          ...this.curPageStatus,
          leaveTime: curTime,
          residence: curTime - this.curPageStatus.inTime,
        },
      });
      img.src = `${api}?data=${encodeURIComponent(JSON.stringify(this.reportStack))}&appId=${Monitor.config.appId}`;
    };
  }

  private getPageMsg = () => Object.assign({ isFirst: false }, getUrlQuery());

  private catchRouterChange = () => {
    const dealWithPageInfo = () => {
      const curTime = new Date().getTime();
      const lastPageStatus = {
        ...this.curPageStatus,
        leaveTime: curTime,
        residence: curTime - this.curPageStatus.inTime,
      };
      this.curPageStatus = {
        inTime: curTime,
        leaveTime: 0,
        residence: 0,
      };
      this.toReport({
        type: 'pageStatus',
        ...this.lastPageMsg,
        ...lastPageStatus,
      });
      this.lastPageMsg = this.getPageMsg();
    };
    _history.addEventListener(() => {
      dealWithPageInfo();
    });
    window.addEventListener('hashchange', () => {
      dealWithPageInfo();
    });
  };

  private toReport(data: ReportItem){
    data.userTimeStamp = new Date().getTime();
    data.markUserId = this.markUserId;
    data.userId = Monitor.userId;
    data.appId = Monitor.config.appId,
    this.reportStack.push(data);
    const { api, cacheMax } = Monitor.config;
    if(this.reportStack.length === cacheMax){
      const img = document.createElement('img');
      img.src = `${api}?data=${encodeURIComponent(JSON.stringify(this.reportStack))}&appId=${Monitor.config.appId}`;
      this.reportStack = [];
    }
  }
  private async getWebPerformance() {
    const [{ domainLookupEnd, domainLookupStart, connectEnd, connectStart }] = window.performance.getEntriesByType('navigation');
    this.performance.dnsTime = domainLookupEnd - domainLookupStart;
    this.performance.tcpTime = connectEnd - connectStart;
    const getWebvitals = (fn: (data: any) => void): Promise<number> => new Promise((resolve) => {
      const timerId = setTimeout(() => {
        resolve(0);
      }, Monitor.config.webVitalsTimeouts);
      fn((data) => {
        clearTimeout(timerId);
        resolve(data.value);
      });
    });
    this.performance.rescources = this.getEnteries();
    const [fcp, ttfp, lcp, fid] = await Promise.all([
      getWebvitals(onFCP),
      getWebvitals(onTTFB),
      getWebvitals(onLCP),
      getWebvitals(onFID),
    ]);
    this.performance.fcp = fcp;
    this.performance.ttfb = ttfp;
    this.performance.lcp = lcp;
    this.performance.fid = fid;
    this.toReport({
      type: 'performance',
      ...this.firstPageMsg,
      ...this.performance,
    });
  }

  private getEnteries() {
    const resources = window.performance.getEntriesByType('resource');
    return resources.map((item) => ({
      resource: item.name,
      duration: item.duration,
      size: item.decodedBodySize,
      type: item.initiatorType,
    }));
  }

  private caughtError() {
    const monitor = this;
    window.addEventListener(
      'error',
      (error: ErrorEvent | Event) => {
        if(error instanceof ErrorEvent){
          monitor.toReport({
            ...monitor.getPageMsg(),
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
            ...monitor.getPageMsg(),
            type: 'loadResourceError',
            resourceType: type,
            resourceUrl: target.src,
          });
        }
      },
      true
    );

    window.addEventListener('unhandledrejection', (error) => {
      this.toReport({
        type: 'rejectError',
        reason: error.reason.toString(),
        ...monitor.getPageMsg(),
      });
    });
  }

  private resetXmlHttp() {
    if (!window.XMLHttpRequest) return;
    const xmlhttp = window.XMLHttpRequest;

    const monitor = this;

    const originOpen = xmlhttp.prototype.open;

    xmlhttp.prototype.open = function(...args) {
      const xml = this as XMLHttpRequest;
      const url = args[1];
      const method = args[0];
      const isGet = method.toLocaleLowerCase() === 'get';
      const reqUrl = isGet ? url.split('?')[0] : url;

      const config: RequestReportMsg = {
        type: 'request',
        url: reqUrl,
        method: args[0].toLocaleLowerCase(),
        reqHeaders: '',
        reqBody: '',
        status: 0,
        requestType: 'done',
        cost: 0,
      };

      config.reqBody = method.toLocaleLowerCase() === 'get' ? url.split('?')[1] : '';

      let startTime;

      const originSend = xml.send;

      const originSetRequestHeader = xml.setRequestHeader;

      const requestHeader = {};
      xml.setRequestHeader = function(key: string, val: string) {
        requestHeader[key] = val;
        return originSetRequestHeader.apply(xml, [key, val]);
      };

      xml.send = function(args: Document | XMLHttpRequestBodyInit){
        if(args){
          config.reqBody = typeof args === 'string' ? args : JSON.stringify(args);
        }
        return originSend.apply(xml, [args]);
      };

      xml.addEventListener('readystatechange', function(ev: Event){
        if(this.readyState === XMLHttpRequest.DONE){
          config.status = this.status;
          config.cost = performance.now() - startTime;
          config.reqHeaders = JSON.stringify(requestHeader);
          config.requestType = this.status < 200 || this.status >= 300 ? 'error' : 'done';
          monitor.toReport({
            type: 'request',
            ...monitor.getPageMsg(),
            ...config,
          });
        }
      });
      xml.addEventListener('loadstart', function(data: ProgressEvent<XMLHttpRequestEventTarget>){
        startTime = performance.now();
      });
      // xml.addEventListener('error', function(data: ProgressEvent<XMLHttpRequestEventTarget>){
      //   console.log('error', config.url);

      //   config.requestType = 'error';
      //   config.status = this.status;
      //   config.cost = performance.now() - startTime;
      //   config.reqHeaders = JSON.stringify(requestHeader);
      //   // monitor.toReport({
      //   //   type: 'request',
      //   //   ...monitor.getPageMsg(),
      //   //   ...config,
      //   // });
      // });
      return originOpen.apply(this, args);
    };
  }

  private resetFetch() {
    const _oldFetch = window.fetch;
    window.fetch = (...args) => {
      const [url, { method, headers, body }] = args;
      const startTime = performance.now();
      const data: RequestReportMsg = {
        type: 'request',
        url: url as string,
        method: method.toLocaleLowerCase(),
        reqHeaders: headers ? JSON.stringify(headers) : '',
        reqBody: body ? JSON.stringify(body) : '',
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
              ...this.getPageMsg(),
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
              ...this.getPageMsg(),
              ...data,
            });
            reject(error);
          });
      });
    };
  }

  static setUserId(userId: string){
    window.localStorage.setItem(`web-watch-dog-userId-${Monitor.config.appId}`, userId);
  }
}

