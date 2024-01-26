import React, { useEffect, useState } from 'react';
import { DatePicker, Table, Input } from 'antd';
import type { TableColumnsType } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { Card } from '@/src/components';
import { getHttpErrorRank } from '@/src/api';
import { RootState } from '@/src/models/store';
import { TableItem } from '@/src/components/tableItem';

interface DataType {
  requestType: string;
  method: string;
  url: string;
  type: string;
  count: number;
}

interface HighFrequencyIn{
  setDetail: (msg: DetailMsg) => void;
}
const searchDate = {
  beginTime: dayjs().add(-6, 'day').format('YYYY-MM-DD:00:00:00'),
  endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
};
export const HighFrequency: React.FC<HighFrequencyIn> = ({ setDetail }) => {
  const { active } = useSelector((state: RootState) => state.app);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  const columns: TableColumnsType<DataType> = [
    {
      title: '接口URL',
      dataIndex: 'url',
      key: 'url',
      width: 200,
      render: (val) => TableItem.renderUrl(val, 60, false),
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      key: 'method',
      width: 100,
    },
    {
      title: '错误量',
      dataIndex: 'count',
      key: 'count',
      width: 100,
    },
    {
      title: '操作',
      width: 120,
      render: (_, record) => <a onClick={() => {
        setDetail({
          url: record.url,
          requestType: 'error',
          ...searchDate,
          open: true,
        });
      }}>查看详情</a>,
    },
  ];

  const getData = async() => {
    setLoading(true);
    const { data } = await getHttpErrorRank({
      appId: active,
      ...searchDate,
    });
    const result = data.map((item) => ({
      count: item.doc_count,
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
      title="高频错误（最近7天）" >
      <Table
        sticky
        rowKey="url"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={
          {
            total: data.length,
            pageSize: 10,
          }
        }
        scroll={{ x: 1300 }}
      />
    </Card>
  );
};
