import { Service } from 'egg';

export interface PageReport {
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

export default class EsService extends Service {
  async created(data:PageReport, appId:string) {

    return await this.app.esClient.index({
      index: `pages_report_${appId}`,
      op_type: 'create',
      body: {
        ...data,
        '@timestamp': new Date(),
      },
    });
  }
  async list(appId:string) {
    return await this.app.esClient.search({
      index: `pages_report_${appId}`,
    });
  }
  async getUvs(appId:string) {
    const { body: initialResponse } = await this.app.esClient.search({
      index: `pages_report_${appId}`,
      // scroll: '1m', // 设置滚动时间
      body: {
        // query: {
        //   range: {
        //     '@timestamp': {
        //       gte: new Date('2023-12-20T08:18:27.029Z').getTime(),
        //       lte: new Date('2024-12-21T08:18:28.426Z').getTime(),
        //     },
        //   },
        // },
        size: 10,
        aggs: {
          group_by_userId: {
            terms: {
              field: 'userId.keyword',
              size: 10,
            },
          },
        },
      },
    });
    return initialResponse.hits.hits;

    // let scrollId = initialResponse._scroll_id;

    // const res = [ ...initialResponse.hits.hits ];
    // // eslint-disable-next-line no-constant-condition
    // while (true) {
    //   const { body: scrollResponse } = await this.app.esClient.scroll({
    //     scroll: '1m',
    //     scroll_id: scrollId,
    //   });
    //   res.push(...scrollResponse.hits.hits);
    //   if (scrollResponse.hits.hits.length === 0) {
    //     break;
    //   }
    //   scrollId = scrollResponse._scroll_id;
    // }
    // return res;
  }
}
