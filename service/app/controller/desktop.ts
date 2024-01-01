import { Controller } from 'egg';
import { encryptPassword, comparePassword } from '@/app/utils/bcrypt';
import { creatJwtToken, getJwtTokenMsg } from '@/app/utils/jwt';
import { BluBiuResponseCode } from '@/app/extend/context.type';
import dayjs from 'dayjs';
export default class DesktopController extends Controller {
  public async login() {
    const { account, password } = this.ctx.request.body;

    const data = await this.service.mysql.user.index.findUser({
      account,
    });

    if (!data) return this.ctx.result(BluBiuResponseCode.LOGINERROR);

    const { encPassword, id } = data;

    const isRight = await comparePassword(password, encPassword);

    if (!isRight) {
      return this.ctx.result(BluBiuResponseCode.LOGINERROR);
    }
    // TODO 登录完成之后操作
    const token = creatJwtToken({
      userId: id,
    });
    // 登录态一周后过期
    this.ctx.cookies.set('BLUBIUTOKEN', token, {
      expires: dayjs().add(1, 'day').toDate(),
    });
    this.ctx.success();

  }
  public async register() {
    try {
      const { account, password } = this.ctx.request.body;

      const data = await this.service.mysql.user.index.findUser({
        account,
      });

      if (data?.id) {
        return this.ctx.result(BluBiuResponseCode.ACCOUNTEXIST);
      }

      await this.service.mysql.user.index.createUser({
        account,
        encPassword: await encryptPassword(password),
      });
      this.ctx.success();
    } catch (error) {
      this.app.logger.error(error);
    }
  }
  async getUserInfo() {
    try {
      const token = this.ctx.cookies.get('BLUBIUTOKEN');
      if (!token) {
        return this.ctx.result(BluBiuResponseCode.NOLOGIN);
      }
      const data = await getJwtTokenMsg<{userId:number}>(token);

      if (!data.userId) return this.ctx.result(BluBiuResponseCode.NOTFOUNDACCOUNT);
      const results = await this.service.mysql.user.index.findUser({
        id: data.userId,
        status: 1,
      });
      if (!results) return this.ctx.result(BluBiuResponseCode.NOTFOUNDACCOUNT);
      this.ctx.success(results);
    } catch (error) {
      this.app.logger.error(error);
    }
  }
  async loginOut() {
    this.ctx.cookies.set('BLUBIUTOKEN', null, {
      expires: dayjs().add(-1, 'day').toDate(),
    });
    this.ctx.success();
  }
}
