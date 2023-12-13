import { KafkaClientOptions } from 'kafka-node'
import { Kafka } from '@/app/kafka'

declare module 'egg' {
  interface Application {
    kafka:  Kafka;
  }

  interface EggAppConfig {
    kafka: KafkaClientOptions;
  }
}