import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;
  router.get('/report', controller.report.index);
  router.get('/api/desktop/performance/getAppAvgPerformance', app.middleware.verifyUser, controller.performance.getAppAvgPerformance);
  router.get('/api/desktop/performance/getPageAvgPerformance', app.middleware.verifyUser, controller.performance.getPageAvgPerformance);
  router.get('/api/desktop/performance/getPerformance', app.middleware.verifyUser, controller.performance.getPerformance);

  router.post('/api/desktop/login', controller.desktop.login);
  router.post('/api/desktop/loginOut', controller.desktop.loginOut);
  router.post('/api/desktop/register', controller.desktop.register);
  router.get('/api/desktop/getUserInfo', controller.desktop.getUserInfo);

  router.get('/api/desktop/getAppList', controller.app.getAppList);
  router.post('/api/desktop/createApp', controller.app.createApp);
  router.post('/api/desktop/updateAppStatus', controller.app.updateAppStatus);

  router.get('/api/desktop/analyse/getDayActiveUsers', controller.analyse.getDayActiveUsers);
  router.get('/api/desktop/analyse/getActiveUsers', controller.analyse.getActiveUsers);
  router.get('/api/desktop/analyse/getWebVisitTop', controller.analyse.getWebVisitTop);
  router.get('/api/desktop/analyse/getNewUsers', controller.analyse.getNewUsers);
  router.get('/api/desktop/analyse/getAllUsers', controller.analyse.getAllUsers);
  router.get('/api/desktop/analyse/getTodayTraffic', controller.analyse.getTodayTraffic);

  router.get('/api/desktop/traffic/getTrafficTimes', controller.traffic.getTrafficTimes);
  router.get('/api/desktop/traffic/getTrafficDays', controller.traffic.getTrafficDays);

  router.get('/api/desktop/httpError/getHttpErrorRank', controller.httpError.getHttpErrorRank);
  router.get('/api/desktop/httpError/getHttpDoneRank', controller.httpError.getHttpDoneRank);
  router.get('/api/desktop/httpError/getHttpErrorRang', controller.httpError.getHttpErrorRang);
  router.get('/api/desktop/httpError/getHttpList', controller.httpError.getHttpList);

  router.get('/api/desktop/jsError/getJsErrorRang', controller.jsError.getJsErrorRang);
  router.get('/api/desktop/jsError/getJsErrorList', controller.jsError.getJsErrorList);
  router.post('/api/desktop/jsError/getNearbyCode', controller.jsError.getNearbyCode);
  router.get('/test', controller.test.index);
};
