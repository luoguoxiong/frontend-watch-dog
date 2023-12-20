import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.trafficStatsScheduleMin = '0 */1 * * * *';

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1702282822597_3491';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.pvuvipScheduleTaskMinTime = '0 */2 * * * *';

  config.security = {
    domainWhiteList: [ 'http://192.168.104.105:18090', 'http://localhost:7001' ],
    csrf: {
      enable: false,
      ignore: '/api/v1/report/**',
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,PUT,POST,DELETE',
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
