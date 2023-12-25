import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: 'http://localhost:9200' });

const data = [{
  id: 152,
  appId: 'luoguoxiong001',
  isFirst: 1,
  origin: 'http://localhost:8080',
  pageUrl: '/95',
  userId: '11',
  ip: '127.0.0.1',
  browserName: 'Chrome',
  browserVersion: '120.0.0.0',
  browserMajor: '120',
  osName: 'Mac OS',
  osVersion: '10.15.7',
  deviceVendor: 'Apple',
  deviceModel: 'Macintosh',
  loadTime: 10,
  dnsTime: 20,
  tcpTime: 30,
  whiteTime: 40,
  domTime: 50,
  fetchTime: 60,
  reirectTime: 70,
  requestTime: 80,
},
{
  id: 151,
  appId: 'luoguoxiong001',
  isFirst: 1,
  origin: 'http://localhost:8080',
  pageUrl: '/86',
  userId: '77',
  ip: '127.0.0.1',
  browserName: 'Chrome',
  browserVersion: '120.0.0.0',
  browserMajor: '120',
  osName: 'Mac OS',
  osVersion: '10.15.7',
  deviceVendor: 'Apple',
  deviceModel: 'Macintosh',
  loadTime: 10,
  dnsTime: 20,
  tcpTime: 30,
  whiteTime: 40,
  domTime: 50,
  fetchTime: 60,
  reirectTime: 70,
  requestTime: 80,
},
{
  id: 150,
  appId: 'luoguoxiong001',
  isFirst: 1,
  origin: 'http://localhost:8080',
  pageUrl: '/91',
  userId: '11',
  ip: '127.0.0.1',
  browserName: 'Chrome',
  browserVersion: '120.0.0.0',
  browserMajor: '120',
  osName: 'Mac OS',
  osVersion: '10.15.7',
  deviceVendor: 'Apple',
  deviceModel: 'Macintosh',
  loadTime: 10,
  dnsTime: 20,
  tcpTime: 30,
  whiteTime: 40,
  domTime: 50,
  fetchTime: 60,
  reirectTime: 70,
  requestTime: 80,
},
{
  id: 149,
  appId: 'luoguoxiong001',
  isFirst: 1,
  origin: 'http://localhost:8080',
  pageUrl: '/50',
  userId: '49',
  ip: '127.0.0.1',
  browserName: 'Chrome',
  browserVersion: '120.0.0.0',
  browserMajor: '120',
  osName: 'Mac OS',
  osVersion: '10.15.7',
  deviceVendor: 'Apple',
  deviceModel: 'Macintosh',
  loadTime: 10,
  dnsTime: 20,
  tcpTime: 30,
  whiteTime: 40,
  domTime: 50,
  fetchTime: 60,
  reirectTime: 70,
  requestTime: 80,
},
{
  id: 142,
  appId: 'luoguoxiong001',
  isFirst: 1,
  origin: 'http://localhost:8080',
  pageUrl: '/53',
  userId: '85',
  ip: '127.0.0.1',
  browserName: 'Chrome',
  browserVersion: '120.0.0.0',
  browserMajor: '120',
  osName: 'Mac OS',
  osVersion: '10.15.7',
  deviceVendor: 'Apple',
  deviceModel: 'Macintosh',
  loadTime: 10,
  dnsTime: 20,
  tcpTime: 30,
  whiteTime: 40,
  domTime: 50,
  fetchTime: 60,
  reirectTime: 70,
  requestTime: 80,
},
{
  id: 140,
  appId: 'luoguoxiong001',
  isFirst: 1,
  origin: 'http://localhost:8080',
  pageUrl: '/60',
  userId: '68',
  ip: '127.0.0.1',
  browserName: 'Chrome',
  browserVersion: '120.0.0.0',
  browserMajor: '120',
  osName: 'Mac OS',
  osVersion: '10.15.7',
  deviceVendor: 'Apple',
  deviceModel: 'Macintosh',
  loadTime: 10,
  dnsTime: 20,
  tcpTime: 30,
  whiteTime: 40,
  domTime: 50,
  fetchTime: 60,
  reirectTime: 70,
  requestTime: 80,
},
{
  id: 139,
  appId: 'luoguoxiong001',
  isFirst: 1,
  origin: 'http://localhost:8080',
  pageUrl: '/91',
  userId: '55',
  ip: '127.0.0.1',
  browserName: 'Chrome',
  browserVersion: '120.0.0.0',
  browserMajor: '120',
  osName: 'Mac OS',
  osVersion: '10.15.7',
  deviceVendor: 'Apple',
  deviceModel: 'Macintosh',
  loadTime: 10,
  dnsTime: 20,
  tcpTime: 30,
  whiteTime: 40,
  domTime: 50,
  fetchTime: 60,
  reirectTime: 70,
  requestTime: 80,
},
{
  id: 137,
  appId: 'luoguoxiong001',
  isFirst: 1,
  origin: 'http://localhost:8080',
  pageUrl: '/54',
  userId: '63',
  ip: '127.0.0.1',
  browserName: 'Chrome',
  browserVersion: '120.0.0.0',
  browserMajor: '120',
  osName: 'Mac OS',
  osVersion: '10.15.7',
  deviceVendor: 'Apple',
  deviceModel: 'Macintosh',
  loadTime: 10,
  dnsTime: 20,
  tcpTime: 30,
  whiteTime: 40,
  domTime: 50,
  fetchTime: 60,
  reirectTime: 70,
  requestTime: 80,
},
{
  id: 136,
  appId: 'luoguoxiong001',
  isFirst: 1,
  origin: 'http://localhost:8080',
  pageUrl: '/57',
  userId: '89',
  ip: '127.0.0.1',
  browserName: 'Chrome',
  browserVersion: '120.0.0.0',
  browserMajor: '120',
  osName: 'Mac OS',
  osVersion: '10.15.7',
  deviceVendor: 'Apple',
  deviceModel: 'Macintosh',
  loadTime: 10,
  dnsTime: 20,
  tcpTime: 30,
  whiteTime: 40,
  domTime: 50,
  fetchTime: 60,
  reirectTime: 70,
  requestTime: 80,
},
{
  id: 135,
  appId: 'luoguoxiong001',
  isFirst: 1,
  origin: 'http://localhost:8080',
  pageUrl: '/25',
  userId: '88',
  ip: '127.0.0.1',
  browserName: 'Chrome',
  browserVersion: '120.0.0.0',
  browserMajor: '120',
  osName: 'Mac OS',
  osVersion: '10.15.7',
  deviceVendor: 'Apple',
  deviceModel: 'Macintosh',
  loadTime: 10,
  dnsTime: 20,
  tcpTime: 30,
  whiteTime: 40,
  domTime: 50,
  fetchTime: 60,
  reirectTime: 70,
  requestTime: 80,
}];


async function insertData(indexName, data) {
  return await client.index({
    index: indexName,
    op_type: 'create',
    body: {
      ...data,
      '@timestamp': new Date(),
    },
  });
}

const yourIndexName = 'test_index';

const pushWork = () => {
  if (yourIndexName === 'test_index') return;
  data.forEach(item => {
    insertData(yourIndexName, item);
  });
};

const creetMappint = async indexName => {
  if (yourIndexName === 'test_index') return;
  try {
    const { body } = await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            userId: { type: 'keyword' },
            pageUrl: { type: 'keyword' },
          },
        },
        settings: {
          // 在这里可以定义索引的设置
          // 例如分片数、副本数等
        },
      },
    });

    console.log(`Mapping updated successfully for index ${indexName}:`, body);
  } catch (error) {
    console.error(`Error updating mapping for index ${indexName}:`, error);
  }
};

const groupByUserIdPageUrl = async indexName => {
  // if (yourIndexName === 'test_index') return;
  const { body } = await client.search({
    index: indexName,
    body: {
      size: 0,
      aggs: {
        grouped_data: {
          terms: {
            field: 'userId', // 第一个字段
          },
          aggs: {
            grouped_data2: {
              terms: {
                field: 'pageUrl', // 第一个字段
              },
            },
          },
        },
      },
    },
  });
  console.log(JSON.stringify((body.aggregations.grouped_data)));
};

creetMappint(yourIndexName);

const deletes = async () => {
  if (yourIndexName === 'test_index') return;
  client.indices.delete({ index: yourIndexName });
};
pushWork();

groupByUserIdPageUrl(yourIndexName);

deletes();
