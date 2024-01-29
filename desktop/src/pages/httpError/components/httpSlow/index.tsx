import React, { useEffect, useState } from 'react';
import { Radio, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Card } from '@/src/components';
import { getHttpDoneRank } from '@/src/api';
import { RootState } from '@/src/models/store';
import { TableItem } from '@/src/components/tableItem';
import { showHttpDetail } from '@/src/utils/enventBus';

interface DataType {
  requestType: string;
  method: string;
  url: string;
  type: string;
  count: number;
  cost: number;
}

export const HttpSlow = () => {
  const [day, setDay] = useState(1);

  const { active } = useSelector((state: RootState) => state.app);

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
        showHttpDetail.publish({
          link: record.url,
          requestType: 'done',
          beginTime: dayjs().add(-(day - 1), 'day').format('YYYY-MM-DD:00:00:00'),
          endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
        });
      }}>查看详情</a>,
    },
  ];

  const getData = async() => {
    setLoading(true);
    const { data } = await getHttpDoneRank({
      appId: active,
      beginTime: dayjs().add(-(day - 1), 'day').format('YYYY-MM-DD:00:00:00'),
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
    if(active){
      getData();
    }
  }, [active, day]);

  return (
    <Card
      title="慢响应Top50"
      prefixHeadRight={
        <Radio.Group
          value={day}
          onChange={(e) => {
            setDay(e.target.value);
          }}
          size="small">
          <Radio.Button value={7}>7天内</Radio.Button>
          <Radio.Button value={3}>3天内</Radio.Button>
          <Radio.Button value={1}>今天</Radio.Button>
        </Radio.Group>
      }
    >
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
