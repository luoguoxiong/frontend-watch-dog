import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { Detail } from './components/detail';
import { Card, ShowTime } from '@/src/components';
import { getPerformance } from '@/src/api';
import { useAppStore } from '@/src/hooks';

const defaultSize = 10;

const PerformanceSearch = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState([]);

  const { active } = useAppStore();

  const [detail, setDetail] = useState(null);

  const [show, setShow] = useState(null);

  const [loading, setLoading] = useState(false);

  const [pagination, setPageIn] = useState({
    current: 1,
    pageSize: defaultSize,
  });

  const [sorter, setSorter] = useState({
    sorterName: '',
    sorterKey: null,
  });

  const [total, setTotal] = useState(0);

  const toSearch = async() => {
    const { pageUrl, date, whiteTime } = form.getFieldsValue();
    const query = {
      from: 1,
      size: defaultSize,
      appId: active,
      pageUrl,
      beginTime: date ? date[0].format('YYYY-MM-DD 00:00:00') : undefined,
      endTime: date ? date[1].format('YYYY-MM-DD 23:59:59') : undefined,
      whiteTime,
      sorterName: sorter.sorterKey ? sorter.sorterName : '',
      sorterKey: sorter.sorterKey ? sorter.sorterKey === 'ascend' ? 'asc' : 'desc' : '',
    };
    search(query);
    setPageIn({
      current: 1,
      pageSize: defaultSize,
    });
    setSorter({
      sorterName: '',
      sorterKey: '',
    });
  };

  const toReset = () => {
    setPageIn({
      current: 1,
      pageSize: defaultSize,
    });
    setSorter({
      sorterName: '',
      sorterKey: '',
    });
    form.resetFields();
    search({
      appId: active,
      from: 1,
      size: defaultSize,
      beginTime: dayjs().format('YYYY-MM-DD 00:00:00'),
      endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
    });
  };

  const onTableChange = (pagination, __, sorter: any) => {
    const { pageUrl, date, whiteTime } = form.getFieldsValue();
    const query = {
      from: pagination.current,
      size: pagination.pageSize,
      appId: active,
      pageUrl,
      beginTime: date ? date[0].format('YYYY-MM-DD 00:00:00') : undefined,
      endTime: date ? date[1].format('YYYY-MM-DD 23:59:59') : undefined,
      whiteTime,
      sorterName: sorter.order ? sorter.field : '',
      sorterKey: sorter.order ? sorter.order === 'ascend' ? 'asc' : 'desc' : '',
    };
    setPageIn({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    if(sorter.order){
      setSorter({
        sorterName: sorter.field,
        sorterKey: sorter.order,
      });
    }else{
      setSorter({
        sorterName: '',
        sorterKey: null,
      });
    }
    search(query);
  };

  const search = async(searchQuery: GetPerformanceReq) => {
    setLoading(true);
    const { data: { total, data } } = await getPerformance(searchQuery);
    setTotal(total);
    setData(data.map((item) => ({
      key: item._id,
      ...item._source,
    })));
    setLoading(false);
  };

  const columns: TableColumnsType<PerfamceReportMsg & PublicMsg> = [
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
      width: 120,
      sorter: true,
      sortOrder: sorter.sorterName === 'whiteTime' ? sorter.sorterKey : null,
      render: (val: number) => <ShowTime
        name="whiteTime"
        value={val} />,
    },
    {
      title: 'FCP',
      dataIndex: 'fcp',
      key: 'fcp',
      width: 100,
      sorter: true,
      sortOrder: sorter.sorterName === 'fcp' ? sorter.sorterKey : null,
      render: (val: number) => <ShowTime
        name="fcp"
        value={val} />,
    },
    {
      title: 'LCP',
      dataIndex: 'lcp',
      key: 'lcp',
      width: 100,
      sorter: true,
      sortOrder: sorter.sorterName === 'lcp' ? sorter.sorterKey : null,
      render: (val: number) => <ShowTime
        name="lcp"
        value={val} />,
    },
    {
      title: 'FID',
      dataIndex: 'fid',
      key: 'fid',
      width: 100,
      sorter: true,
      sortOrder: sorter.sorterName === 'fid' ? sorter.sorterKey : null,
      render: (val: number) => <ShowTime
        name="fid"
        value={val} />,
    },
    {
      title: 'TTFB',
      dataIndex: 'ttfb',
      key: 'ttfb',
      width: 100,
      sorter: true,
      sortOrder: sorter.sorterName === 'ttfb' ? sorter.sorterKey : null,
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
    {
      title: '操作',
      width: 120,
      render: (_, record) => <a onClick={() => {
        setDetail(record);
        setShow(true);
      }}>查看详情</a>,
    },
  ];

  useEffect(() => {
    if(active){
      toReset();
    }
  }, [active]);

  return (
    <Card title="首屏查询">
      <Form
        form={form}
        style={{ paddingBottom: 20 }}
        name="horizontal_login"
        layout="inline">
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
          initialValue=""
          label="白屏时间">
          <Radio.Group>
            <Radio value="">不限</Radio>
            <Radio value="1">1s以内</Radio>
            <Radio value="2">1~2s</Radio>
            <Radio value="3">2~3s</Radio>
            <Radio value="4">3s以上</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            onClick={toReset}>重置</Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={toSearch}>查询</Button>
        </Form.Item>
      </Form>

      <Table
        sticky
        key="_id"
        loading={loading}
        columns={columns}
        dataSource={data}
        onChange={onTableChange}
        pagination={{
          ...pagination,
          total,
        }}
        scroll={{ x: 1300 }}
      />
      <Detail
        data={detail}
        onClose={() => {
          setShow(false);
        }}
        open={show} />
    </Card>

  );
};

export default PerformanceSearch;
