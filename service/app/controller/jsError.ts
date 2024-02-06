import fs from 'fs/promises';
import dayjs from 'dayjs';
import { Controller } from 'egg';
import { SourceMapConsumer } from 'source-map';
export default class JsErrorController extends Controller {
  public async getJsErrorRang(){
    const { ctx, service } = this;
    const { appId, beginTime, endTime } = ctx.query;
    const today = dayjs().format('YYYY-MM-DD');
    const getDataFromCache = async(appId: string, date: string): Promise<number> => {
      const cacheKey = dayjs(date).format('YYYY-MM-DD');
      if(dayjs(cacheKey).diff(today) > 0){
        return 0;
      }
      if(cacheKey === today){
        return await service.elasticsearch.report.jsError.getOneDayJsErrorCount(appId, cacheKey);
      }else{
        const cacheData = await this.service.redis.everyDayJsError.getJsError(appId, cacheKey);
        if(cacheData)return Number(cacheData);
        const esData = await service.elasticsearch.report.jsError.getOneDayJsErrorCount(appId, cacheKey);
        await this.service.redis.everyDayJsError.saveJsError(appId, cacheKey, esData);
        return esData;
      }
    };
    let index = dayjs(beginTime);
    const task: any[] = [];
    const label: string[] = [];
    while (index.diff(dayjs(endTime)) <= 0) {
      label.push(index.format('MM-DD'));
      task.push(getDataFromCache(appId, index.format('YYYY-MM-DD')));
      index = index.add(1, 'day');
    }
    const data = await Promise.all(task);
    const result = data.map((item, index) => ({
      value: Number(item || 0),
      label: label[index],
    }));
    this.ctx.success(result);
  }

  async getJsErrorList(){
    const { ctx } = this;
    const { appId, beginTime, endTime } = ctx.query;
    const data = await this.ctx.service.elasticsearch.report.jsError.getJsErrorList(appId, beginTime, endTime);
    this.ctx.success(data);
  }

  async getNearbyCode() {
    const { lineNumber, columnNumber } = this.ctx.request.body;

    try {
      const sourcemapContent = await fs.readFile(this.ctx.request.files[0].filepath, 'utf-8');
      const nearbyCode = await this.findNearbyCode(sourcemapContent, lineNumber, columnNumber);
      this.ctx.success(nearbyCode);
    } catch (error) {
      this.ctx.success({
        code: [],
        line: -1,
        source: '',
      });
    }
  }

  async findNearbyCode(sourcemap, lineNumber, columnNumber) {
    return new Promise((resolve) => {
      new SourceMapConsumer(sourcemap).then((consumer) => {
        const originalPosition = consumer.originalPositionFor({
          line: Number(lineNumber),
          column: Number(columnNumber),
        });

        if(originalPosition.source && originalPosition.line){
          const lines = consumer.sourceContentFor(originalPosition.source)?.split('\n');
          const code = lines?.slice(Math.max(0, originalPosition.line - 5), originalPosition.line + 5);
          resolve({
            code,
            line: 5,
            source: originalPosition.source,
          });
        }else{
          resolve({
            code: [],
            line: -1,
            source: '',
          });
        }
      });
    });
  }
}
