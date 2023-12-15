import { Context } from 'egg';


type ResponseMsg = {
  [key in BluBiuResponseCode]: string;
};

export enum BluBiuResponseCode{
  SUCCESS = 1000,
  QUERYERROR = 1001
}

export const responseMsg:ResponseMsg = {
  [BluBiuResponseCode.SUCCESS]: '',
  [BluBiuResponseCode.QUERYERROR]: '请求参数错误',
};

export interface BluBiuResponse<T>{
  code: BluBiuResponseCode
  message:string
  data:T
}

export default {
  result(code:BluBiuResponseCode, data?:any) {
    const ctx = this as Context;
    ctx.body = {
      code,
      message: responseMsg[code],
      data,
    };
  },

  success(data:any) {
    this.result(BluBiuResponseCode.SUCCESS, data);
  },

  queryError() {
    this.result(BluBiuResponseCode.QUERYERROR);
  },
};

