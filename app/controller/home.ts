import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, service } = this;
    const result2 = await this.app.mysql.insert('posts', { title: 'Hello World' });
    const insertSuccess = result2.affectedRows === 1;
    const result = await service.test.list();
    ctx.body = {
      succes: insertSuccess,
      data: result,
    };
  }
}
