export type ResponseMsg = {
  [key in BluBiuResponseCode]: string;
};

export enum BluBiuResponseCode{
  SUCCESS = 1000,
  QUERYERROR = 1001,
  APPIDNOUSE = 1002
}
export const responseMsg:ResponseMsg = {
  [BluBiuResponseCode.SUCCESS]: '',
  [BluBiuResponseCode.QUERYERROR]: '请求参数错误',
  [BluBiuResponseCode.APPIDNOUSE]: 'APPID错误或者AppID未启用',
};
