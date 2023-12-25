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
