import React, { useEffect, useState } from 'react';
import { DatePicker, Table, Input } from 'antd';
import type { TableColumnsType } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Card } from '@/src/components';
import { getHttpDoneRank } from '@/src/api';
import { RootState } from '@/src/models/store';

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

  const [data, setData] = useState([]);
  const columns: TableColumnsType<DataType> = [
    {
      title: '接口URL',
      dataIndex: 'url',
      key: 'url',
      width: 200,
      render: (val) => decodeURIComponent(val.replace(/\+/g, ' ')),
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
    },
    {
      title: '操作',
      width: 120,
      render: (_, record) => <a>查看详情</a>,
    },
  ];

  const getData = async() => {
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
