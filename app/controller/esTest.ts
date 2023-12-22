import { Controller } from 'egg';

export default class EsTestController extends Controller {
  async create() {
    const { app } = this;
    await app.esClient.index({
      index: 'test',
      op_type: 'create',
      body: {
        foo: 'foo',
        bar: 'bar',
        '@timestamp': new Date(), // 创建时间
        updated_at: null, // 初始更新时间为null
      },
    });
    this.ctx.success({ });
  }
  async get() {
    const { app } = this;
    const data = await app.esClient.search({
      index: 'test',
    });
    this.ctx.success(data);
  }
  async update() {
    const { app } = this;
    const data = await app.esClient.update({
      id: 'a8swi4wBJeAV4sAzg5jF',
      index: 'test',
      body: {
        doc: {
          foo: 'foo2',
          bar: 'bar2',
          updated_at: new Date(),
        },
      },
    });
    this.ctx.success(data);
  }
  async delete() {
    const { app } = this;
    await app.esClient.deleteByQuery({
      index: 'test',
      body: {
        query: {
          match_all: {}, // 匹配所有文档
        },
      },
    });
    this.ctx.success({});
  }
}
