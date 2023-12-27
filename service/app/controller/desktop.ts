import { Controller } from 'egg';
import { comparePassword, encryptPassword } from '@/app/utils/bcrypt';
import { creatJwtToken } from '@/app/utils/jwt';
import dayjs from 'dayjs';
export default class DesktopController extends Controller {
  public async login() {
    this.ctx.success();
  }
  public async register() {
    const query = {
      user: 'lgx112535',
      password: 'lgx112535',
    };
    const encryPwd = await encryptPassword(query.password);
    const isRight = await comparePassword(query.password, encryPwd);

    const token = creatJwtToken({
      userId: 10,
    });

    this.ctx.cookies.set('userToken', token, {
      expires: dayjs().add(1, 'week').toDate(),
    });
    this.ctx.success({ encryPwd, isRight });
  }
}
