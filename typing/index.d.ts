import { KafkaClientOptions } from 'kafka-node'
import { Kafka } from '@/app/service/kafuka'
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