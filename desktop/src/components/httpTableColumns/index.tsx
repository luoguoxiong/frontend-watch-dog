import { TableColumnsType, Tag } from 'antd';
import React from 'react';
import { SortOrder } from 'antd/es/table/interface';
import { TableItem } from '../tableItem';

export const httpTableColumns = (sorter: {
  sorterName: string;
  sorterKey: SortOrder;
}): TableColumnsType<RequestReportMsg & PublicMsg> => [
  {
    title: '接口地址',
    dataIndex: 'url',
    key: 'url',
    width: 220,
    fixed: 'left',
    render: (url) => TableItem.renderUrl(url, 30, true),
  },
  {
    title: '状态码',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status, record) => <Tag color={record.requestType === 'done' ? '#1f8800' : '#c33300'}>{status}</Tag>,
  },
  {
    title: '请求耗时',
    dataIndex: 'cost',
    key: 'cost',
    sorter: true,
    sortOrder: sorter.sorterName === 'cost' ? sorter.sorterKey : null,
    width: 120,
    render: (val) => TableItem.renderHttpCost(val),
  },
  {
    title: '请求方法',
    dataIndex: 'method',
    key: 'method',
    width: 80,
  },
  {
    title: '请求头信息',
    dataIndex: 'reqHeaders',
    key: 'reqHeaders',
    width: 120,
    render: (text) => TableItem.renderText(text, 10, false),
  },
  {
    title: '请求体',
    dataIndex: 'reqBody',
    key: 'reqBody',
    width: 200,
    render: (url) => TableItem.renderUrl(url, 23, true),
  },
  {
    title: '时间',
    dataIndex: '@timestamp',
    key: '@timestamp',
    width: 200,
    render: (time) => TableItem.renderTime(time),
  },
];
