import React from 'react';
import { Space, Switch, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { AvgData, ShowTime } from './components';
import { Card } from '@/src/components';

type TableRowSelection<T> = TableProps<T>['rowSelection'];


interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const columns: TableColumnsType<DataType> = [
  {
    title: '网页链接',
    dataIndex: 'pageUrl',
    key: 'pageUrl',
    width: 200,
    fixed: 'left',
  },
  {
    title: '白屏时间',
    dataIndex: 'whiteTime',
    key: 'whiteTime',
    width: 100,
    render: (val: number) => <ShowTime
      name="whiteTime"
      value={val} />,
  },
  {
    title: 'FCP',
    dataIndex: 'fcp',
    key: 'fcp',
    width: 100,
    render: (val: number) => <ShowTime
      name="fcp"
      value={val} />,
  },
  {
    title: 'LCP',
    dataIndex: 'lcp',
    key: 'lcp',
    width: 100,
    render: (val: number) => <ShowTime
      name="lcp"
      value={val} />,
  },
  {
    title: 'FID',
    dataIndex: 'fid',
    key: 'fid',
    width: 100,
    render: (val: number) => <ShowTime
      name="fid"
      value={val} />,
  },
  {
    title: 'TTFB',
    dataIndex: 'ttfb',
    key: 'ttfb',
    width: 100,
    render: (val: number) => <ShowTime
      name="ttfb"
      value={val} />,
  },
  {
    title: 'DNS解析时长',
    dataIndex: 'dnsTime',
    key: 'dnsTime',
    width: 120,
    render: (val: number) => <ShowTime
      name="dnsTime"
      value={val} />,
  },
  {
    title: 'TCP链接时长',
    dataIndex: 'tcpTime',
    key: 'tcpTime',
    width: 120,
    render: (val: number) => <ShowTime
      name="tcpTime"
      value={val} />,
  },
];

const data: DataType[] = [
  {
    'isFirst': true,
    'pageUrl': 'http://localhost:8080/visitorStats',
    'domain': 'localhost:8080',
    'dnsTime': 0,
    'tcpTime': 0,
    'whiteTime': 20.300000000279397,
    'fcp': 67.90000000037253,
    'ttfb': 14.400000000372529,
    'lcp': 67.90000000037253,
    'fid': 2.400000000372529,
    'userTimeStamp': 1705492555807,
    'markUserId': 'gbuqmpf11705492497473',
    'userId': null,
    'appId': 'lqsxg8fk1705492465989',
    'ip': '127.0.0.1',
    '@timestamp': '2024-01-17T11:55:55.834Z',
  },
];
interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const Performance = () => (
  <>
    <Card title="应用性能概况">
      <AvgData />
    </Card>
    <Card title="网页加载性能">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 1300 }}
      />
    </Card>
  </>
);

export default Performance;
