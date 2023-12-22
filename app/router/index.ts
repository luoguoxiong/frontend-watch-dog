import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;
  router.get('/report', controller.report.index);
  router.get('/performance/getPagesPerformance', controller.performance.getPagesPerformance);
  router.get('/app', controller.app.index);

  router.get('/elasticsearch/create', controller.esTest.create);
  router.get('/elasticsearch/get', controller.esTest.get);
  router.get('/elasticsearch/delete', controller.esTest.delete);
  router.get('/elasticsearch/update', controller.esTest.update);
};
