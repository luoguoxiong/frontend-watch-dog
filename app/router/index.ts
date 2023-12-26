import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;
  router.get('/report', controller.report.index);
  router.get('/performance/getPagesPerformance', controller.performance.getPagesPerformance);
  router.get('/app', controller.app.index);
};
