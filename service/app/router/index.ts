import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;
  router.get('/report', controller.report.index);
  router.get('/performance/getPagesPerformance', controller.performance.getPagesPerformance);
  router.get('/app', controller.app.index);

  router.get('/api/desktop/login', controller.desktop.login);
  router.get('/api/desktop/register', controller.desktop.register);
};
