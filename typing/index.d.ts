import { KafkaClientOptions } from 'kafka-node'
import { Kafka } from '@/app/kafka'
import {Client,ClientOptions} from '@elastic/elasticsearch'

declare module 'egg' {
  interface Application {
    kafka:  Kafka;
    esClient:Client
  }

  interface EggAppConfig {
    kafka: KafkaClientOptions;
    esClient:ClientOptions
  }
}