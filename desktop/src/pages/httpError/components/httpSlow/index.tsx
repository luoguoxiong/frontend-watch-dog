import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { Card } from '@/src/components';
import { getHttpDoneRank } from '@/src/api';
import { RootState } from '@/src/models/store';
import { TableItem } from '@/src/components/tableItem';

interface DataType {
  requestType: string;
  method: string;
  url: string;
  type: string;
  count: number;
  cost: number;
}

export const HttpSlow = () => {
  const { active } = useSelector((state: RootState) => state.app);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  const columns: TableColumnsType<DataType> = [
    {
      title: '接口URL',
      dataIndex: 'url',
      key: 'url',
      width: 200,
      render: (val) => TableItem.renderUrl(val, 40, false),
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      key: 'method',
      width: 100,
    },
    {
      title: '访问量',
      dataIndex: 'count',
      key: 'count',
      width: 100,
    },
    {
      title: '平均响应时间',
      dataIndex: 'cost',
      key: 'cost',
      width: 100,
      render: (val) => TableItem.renderHttpCost(val),
    },
    {
      title: '操作',
      width: 120,
      render: (_, record) => <a onClick={() => {
        navigate(`/httpSearch?url=${encodeURIComponent(record.url)}&requestType=done`);
      }}>查看详情</a>,
    },
  ];

  const getData = async() => {
    setLoading(true);
    const { data } = await getHttpDoneRank({
      appId: active,
      beginTime: dayjs().add(-6, 'day').format('YYYY-MM-DD:00:00:00'),
      endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
    });
    const result = data.map((item) => ({
      count: item.doc_count,
      cost: item.avg_cost.value,
      ...item.key,
    }));
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [active]);

  return (
    <Card
      title="慢响应Top50（最近7天）" >
      <Table
        sticky
        rowKey="url"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{
          total: data.length,
          pageSize: 10,
        }}
        scroll={{ x: 1300 }}
      />
    </Card>
  );
};
