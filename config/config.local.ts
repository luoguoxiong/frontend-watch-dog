import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'database_dev',
    password: '123456',
  };

  config.kafka = {
    kafkaHost: 'localhost:9092',
  };

  return config;
};
