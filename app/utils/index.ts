import { Context } from 'egg';

export const getUserIp = (ctx:Context) => {
  const res = (ctx.req.headers['x-forwarded-for'] ||
  ctx.req.headers['x-real-ip'] ||
  ctx.req.headers.remote_addr ||
  ctx.req.headers.client_ip ||
  ctx.req.connection.remoteAddress ||
  ctx.req.socket.remoteAddress ||
  ctx.ip) as string;
  return res === '::1' ? '127.0.0.1' : res;
};


export const cacheConfig = () => {
  const cacheData = new Map<string, any>();

  return {
    set(key: string, value: any) {
      cacheData.set(key, value);
    },
    get(key: string) {
      return cacheData.get(key);
    },
  };
};

export const createIndexName = (baseName:string, appId:string) => {
  return baseName.replace('yourAppId', appId);
};
