import { Context } from 'egg';
import { getJwtTokenMsg } from '@/app/utils/jwt';
import { BluBiuResponseCode } from '@/app/extend/context.type';

export default async function verifyUser(ctx: Context, next: () => Promise<void>) {
  const token = ctx.cookies.get('BLUBIUTOKEN');

  if (!token) return ctx.result(BluBiuResponseCode.NOLOGIN);

  const data = await getJwtTokenMsg<{userId: number}>(token);

  if (!data.userId) return ctx.result(BluBiuResponseCode.NOTFOUNDACCOUNT);

  await next();
}
