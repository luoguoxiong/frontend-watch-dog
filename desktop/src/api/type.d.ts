interface LoginRegsiterIn{
  account: string;
  password: string;
}

interface UserInfo{
  /** 用户ID */
  id?: number;
  /** 登录账号 */
  account: string;
  /** 加密登录密码 */
  encPassword: string;
  /** 账号状态 */
  status: 0 | 1;
  createdAt?: string;
  updatedAt?: string;
}

interface CreateAppIn{
  appType: number;
  appName: string;
}

interface UpdateAppInfo{
  appId: string;
  id: number;
  status: number;
}

interface AppInfo{
  id: number;
  appId: string;
  appName: string;
  createId: number;
  appType: number;
  status: number;
}

type TopKeys = 'webVisit' | 'browser' | 'deviceVendor' | 'city' | 'osName';

interface AnalyseReq{
  appId: string;
  date?: string;
  beginTime?: string;
  endTime?: string;
}
interface TopReq{
  appId: string;
  type?: TopKeys;
  top?: number;
}

interface Options{
  label: string;
  value: string|number;
}

interface TodayTrafficRes{
  allUsers: number;
  newUsers: [number, number];
  pv: [number, number];
  ip: [number, number];
  activeUsers: [number, number];
}

interface TrafficTimesReq{
  appId: string;
  date: string;
  pageUrl: string;
}

interface TrafficDaysReq{
  appId: string;
  pageUrl: string;
  beginTime: string;
  endTime: string;
}

interface TrafficTimesRes{
  pageViews: Record<string, number>;
  uniqueIPsCount: Record<string, number>;
  uniqueVisitors: Record<string, number>;
}


interface PerformanceInPage{
  key: string;
  doc_count: number;
}

type PerformanceInValue = Record<string, {
  value: number;
}>

interface GetPerformanceReq{
  appId: string;
  from: number | undefined;
  size: number | undefined;
  pageUrl?: string | undefined;
  beginTime?: string | undefined;
  endTime?: string | undefined;
  /** 1:1s以内 2:1~2s 3:2~3s 4:3s以上 */
  whiteTime?: 1 | 2 | 3 | 4 | undefined;
  sorterName?: string;
  sorterKey?: string;
}


type PaginationData<T> ={
  '_id': 'NIa1H40Bx791ks39qTfs';
  '_source': T;
}
interface Pagination<T>{
  total: number;
  data: PaginationData<T>[];
}

type GetPerformanceRes = Pagination<PerfamceReportMsg & PublicMsg>

interface HttpErrorRankRes{
  doc_count: number;
  avg_cost: {
    value: number;
  };
  key: {
    method: string;
    requestType: string;
    type: string;
    url: string;
  };
}

interface GetHttpListReq{
  appId: string;
  from: number | undefined;
  size: number | undefined;
  url?: string | undefined;
  link?: string | undefined;
  beginTime?: string | undefined;
  endTime?: string | undefined;
  requestType?: 'done'|'error'|string;
  sorterName?: string;
  sorterKey?: string;
}

type GetHttpListRes = Pagination<RequestReportMsg & PublicMsg>


type JsErrorMsgItem = JsErrorReportMsg & {
  errorCount: number;
  userIds: string[];
  id: number;
}

type NearbyCodeMsg = {
  code: string[];
  originalPosition: {
    source: string | null;
    line: number | null;
    column: number | null;
    name: string | null;
  };
  source: string;
  start: number;
}
