import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { Card, ShowTime } from '@/src/components';
import { getPerformance } from '@/src/api';
import { useAppStore } from '@/src/hooks';
interface DataType {
  pageUrl: string;
  whiteTime: number;
  fcp: number;
  lcp: number;
  fid: number;
  ttfb: number;
  dnsTime: number;
  tcpTime: number;
}
const PerformanceSearch = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState([]);

  const { active } = useAppStore();

  const onFinish = async() => {
    const { pageUrl, date, whiteTime } = form.getFieldsValue();
    const { data: { total, data } } = await getPerformance({
      appId: active,
      pageUrl,
      beginTime: date ? date[0].format('YYYY-MM-DD 00:00:00') : undefined,
      endTime: date ? date[1].format('YYYY-MM-DD 23:59:59') : undefined,
      whiteTime,
      from: 1,
      size: 10,
    });
    setData(data.map((item) => ({
      key: item._id,
      ...item._source,
    })));
  };

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
      sorter: (a, b) => a.whiteTime - b.whiteTime,
      render: (val: number) => <ShowTime
        name="whiteTime"
        value={val} />,
    },
    {
      title: 'FCP',
      dataIndex: 'fcp',
      key: 'fcp',
      width: 100,
      sorter: (a, b) => a.fcp - b.fcp,
      render: (val: number) => <ShowTime
        name="fcp"
        value={val} />,
    },
    {
      title: 'LCP',
      dataIndex: 'lcp',
      key: 'lcp',
      width: 100,
      sorter: (a, b) => a.lcp - b.lcp,
      render: (val: number) => <ShowTime
        name="lcp"
        value={val} />,
    },
    {
      title: 'FID',
      dataIndex: 'fid',
      key: 'fid',
      width: 100,
      sorter: (a, b) => a.fid - b.fid,
      render: (val: number) => <ShowTime
        name="fid"
        value={val} />,
    },
    {
      title: 'TTFB',
      dataIndex: 'ttfb',
      key: 'ttfb',
      width: 100,
      sorter: (a, b) => a.ttfb - b.ttfb,
      render: (val: number) => <ShowTime
        name="ttfb"
        value={val} />,
    },
    {
      title: 'DNS解析时长',
      dataIndex: 'dnsTime',
      key: 'dnsTime',
      width: 120,
      sorter: (a, b) => a.dnsTime - b.dnsTime,
      render: (val: number) => <ShowTime
        name="dnsTime"
        value={val} />,
    },
    {
      title: 'TCP链接时长',
      dataIndex: 'tcpTime',
      key: 'tcpTime',
      width: 120,
      sorter: (a, b) => a.tcpTime - b.tcpTime,
      render: (val: number) => <ShowTime
        name="tcpTime"
        value={val} />,
    },
  ];

  return (
    <Card title="首屏查询">
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}>
        <Form.Item
          name="pageUrl"
          label="网页链接"
        >
          <Input
            placeholder="请输入网页链接" />
        </Form.Item>
        <Form.Item
          name="date"
          label="日期"
          initialValue={[dayjs(), dayjs()]}
        >
          <DatePicker.RangePicker/>
        </Form.Item>
        <Form.Item
          name="whiteTime"
          label="白屏时间">
          <Radio.Group>
            <Radio value="1">1s以内</Radio>
            <Radio value="2">1~2s</Radio>
            <Radio value="3">2~3s</Radio>
            <Radio value="4">3s以上</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button>重置</Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={onFinish}>查询</Button>
        </Form.Item>
      </Form>

      <Table
        sticky
        key="_id"
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 1300 }}
      />
    </Card>

  );
};

export default PerformanceSearch;
