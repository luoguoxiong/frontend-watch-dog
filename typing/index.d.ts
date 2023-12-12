import { KafkaClientOptions } from 'kafka-node'

type EggMySQL = RDSClient;
declare module 'egg' {
  interface Application {
    kafka: EggMySQL;
  }

  interface EggAppConfig {
    kafka: KafkaClientOptions;
  }
}