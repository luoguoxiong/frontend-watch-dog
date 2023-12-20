export interface TrafficPvStatsIn{
  pageUrl:string
  count:number
}

export interface TrafficUvStatsIn{
  pageUrl:string
  count:number
  userId:string
}


export interface TrafficIpStatsIn{
  pageUrl:string
  count:number
  ip:string
}

export interface TrafficStatsRes{
  trafficPvStats:TrafficPvStatsIn[]
  trafficUvStats:TrafficUvStatsIn[]
  trafficIpStats:TrafficIpStatsIn[]
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
