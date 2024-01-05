import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;
  router.get('/report', controller.report.index);
  router.get('/performance/getPagesPerformance', controller.performance.getPagesPerformance);

  router.post('/api/desktop/login', controller.desktop.login);
  router.post('/api/desktop/loginOut', controller.desktop.loginOut);
  router.post('/api/desktop/register', controller.desktop.register);
  router.get('/api/desktop/getUserInfo', controller.desktop.getUserInfo);

  router.get('/api/desktop/getAppList', controller.app.getAppList);
  router.post('/api/desktop/createApp', controller.app.createApp);

  router.get('/api/desktop/analyse/getDayActiveUsers', controller.analyse.getDayActiveUsers);
  router.get('/api/desktop/analyse/getWebVisitTop', controller.analyse.getWebVisitTop);
  router.get('/api/desktop/analyse/getNewUsers', controller.analyse.getNewUsers);
  router.get('/api/desktop/analyse/getAllUsers', controller.analyse.getAllUsers);
};