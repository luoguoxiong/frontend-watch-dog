import { Context } from 'egg';

export const getUserIp = (ctx:Context) => {
  const res = (ctx.req.headers['x-forwarded-for'] ||
  ctx.req.headers['x-real-ip'] ||
  ctx.req.headers.remote_addr ||
  ctx.req.headers.client_ip ||
  ctx.req.connection.remoteAddress ||
  ctx.req.socket.remoteAddress ||
  ctx.ip) as string;
  return res ? res.match(/[.\d\w]+/g)?.join('') : '';
};
