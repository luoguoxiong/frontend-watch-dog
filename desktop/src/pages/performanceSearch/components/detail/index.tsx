/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Drawer, Table, TableColumnsType, Tag } from 'antd';
import { Col, Row } from 'antd';
import styles from './index.module.less';
import { getStatusColor } from '@/src/utils/getStatusColor';

interface Detail{
  data: PerfamceReportMsg & PublicMsg | null;
  open: boolean;
  onClose: () => void;
}

interface ShowPerformanceIn{
  performanceKey: PerformanceInKey;
  value: number;
  title: string;
}

const mapping = [
  {
    name: '域名',
    key: 'domain',
  },
  {
    name: '网页路径',
    key: 'pageUrl',
  },
  {
    name: '请求参数',
    key: 'query',
  },
  {
    name: '用户信息',
    key: 'markUserId',
    render: (item: PerfamceReportMsg & PublicMsg) => [item?.markUserId, item?.userId].filter((item) => item).join('、'),
  },
  {
    name: 'UserAgent',
    key: 'ua',
  },
  {
    name: 'IP信息',
    key: 'ip',
    render: (item: PerfamceReportMsg & PublicMsg) => [item?.ip, item?.country, item?.province, item?.city].filter((item) => item).join(' - '),
  },
  {
    name: '性能指标',
    key: 'ip',
    render: (record: PerfamceReportMsg & PublicMsg) => {
      const map = [
        {
          name: '白屏时间',
          key: 'whiteTime',
        },
        {
          name: 'FCP',
          key: 'fcp',
        },
        {
          name: 'LCP',
          key: 'lcp',
        },
        {
          name: 'FID',
          key: 'fid',
        },
        {
          name: 'TTFB',
          key: 'ttfb',
        },
        {
          name: 'DNS解析时长',
          key: 'dnsTime',
        },
        {
          name: 'TCP链接时长',
          key: 'tcpTime',
        },
      ];
      return map.map(((item) => <ShowPerformance
        key={item.key}
        performanceKey={item.key as PerformanceInKey}
        title={item.name}
        value={record[item.key]} />));
    },
  },
  {
    name: '加载资源',
    key: 'rescources',
    render: (item: PerfamceReportMsg & PublicMsg) => {
      const columns: TableColumnsType<ResourceStatus> = [
        {
          title: '资源Url',
          width: 100,
          dataIndex: 'resource',
          key: 'resource',
          fixed: 'left',
        },
        {
          title: '资源大小',
          dataIndex: 'size',
          key: 'size',
          width: 80,
          render: (value) => <span>
            {value.toFixed(0)}
            <small>kb</small>
          </span>,
        },
        {
          title: '加载耗时',
          dataIndex: 'duration',
          key: 'duration',
          width: 50,
          render: (value) => <span>
            {value.toFixed(0)}
            <small>ms</small>
          </span>,
        },
        {
          title: '资源类型',
          dataIndex: 'type',
          key: 'type',
          width: 60,
        },
      ];

      return (
        <Table
          scroll={{
            x: 600,
          }}
          columns={columns}
          dataSource={item.rescources}
          pagination={null}/>
      );
    },
  },
];

const ShowPerformance: React.FC<ShowPerformanceIn> = ({ performanceKey, value, title }) => {
  const color = getStatusColor(value, performanceKey);

  return (
    <Tag
      color={color}
      style={{ marginBottom: 10 }}
    >
      {title}:{value && value.toFixed(0)}
      <small>ms</small>
    </Tag>
  );
};

export const Detail: React.FC<Detail> = ({ data, open, onClose }) => (
  <Drawer
    open={open}
    onClose={onClose}
    width={800}
    destroyOnClose
    title="详情信息">
    {
      data ? mapping.map((item) => <Row key={item.key}>
        <Col
          span={3}
          className={styles.label}>{item.name}:</Col>
        <Col
          span={20}
          className={styles.value}>{item.render ? item.render(data) : data?.[item.key] || '-'}</Col>
      </Row>)
        : null
    }
  </Drawer>
);
