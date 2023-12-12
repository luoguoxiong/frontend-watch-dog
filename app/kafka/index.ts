'use strict';
import assert from 'node:assert';
import kafka, { KafkaClient, Producer, KafkaClientOptions, ProduceRequest, OffsetFetchRequest, Message } from 'kafka-node';
import { Application } from 'egg';

export default (app:Application) => {
  app.addSingleton('kafka', createClient);
};

class Kafka {
  public config:KafkaClientOptions;
  public app: Application;
  public client: KafkaClient;
  public producer: Producer;
  constructor(config:KafkaClientOptions, app:Application) {
    this.config = config || {};
    this.app = app;
    this.client = new kafka.KafkaClient(this.config);
    const Producer = kafka.Producer;
    if (this.client) {
      this.producer = new Producer(this.client);
      this.producer.on('ready', () => {
        this.app.coreLogger.info('[egg-kafka] the producer is ready.');
      });
      this.producer.on('error', err => {
        this.app.coreLogger.error(`[egg-kafka] have error ${err}`);
      });
    }
  }


  consumer(consumers:OffsetFetchRequest[], onMessage:(messge:Message)=>void) {
    const Consumer = kafka.Consumer;
    const _consumer = new Consumer(
      this.client,
      consumers,
      {
        autoCommit: true,
      },
    );
    _consumer.on('error', err => {
      this.app.coreLogger.error(`[egg-kafka] consumer have error ${err}`);
    });
    _consumer.on('message', (message:Message) => {
      onMessage && onMessage(message);
    });
  }

  consumerGroup(type = 'web', fn) {
    assert(type, '[egg-kafka] consumers type argument must be required');
    const kafkaConfig = this.app.config.kafka;
    const kafkaHost = kafkaConfig.kafkaHost;
    const consumerOption = kafkaConfig.consumerGroup[type] || {};
    const topic = consumerOption.topic;
    consumerOption.kafkaHost = kafkaHost;
    const ConsumerGroup = kafka.ConsumerGroup;
    const _consumer = new ConsumerGroup(consumerOption, topic);
    _consumer.on('error', err => {
      this.app.coreLogger.error(`[egg-kafka] consumer have error ${err}`);
    });
    _consumer.on('message', message => {
      fn && fn(message);
    });
  }

  send(producers:ProduceRequest[]) {
    this.producer.send(producers, (err, data) => {
      if (err) assert(err, '[egg-kafka] err. errmsg ${err}');
      console.log(data);
    });
  }
}

function createClient(config, app) {
  const kafka = new Kafka(config, app);
  return kafka;
}
