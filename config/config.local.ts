import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.sequelize = {
    datasources: [
      {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'database_dev',
        password: '123456',
        define: {
          freezeTableName: true,
        },
      },
    ],
  };

  config.kafka = {
    kafkaHost: 'localhost:9092',
  };

  return config;
};
