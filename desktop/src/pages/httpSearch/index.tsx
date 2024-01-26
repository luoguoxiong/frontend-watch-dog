import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Table } from 'antd';
import dayjs from 'dayjs';
import { Card } from '@/src/components';
import { getHttpList } from '@/src/api';
import { useAppStore } from '@/src/hooks';
import { httpTableColumns } from '@/src/components/httpTableColumns';

const defaultSize = 10;

const HttpSearch = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState([]);

  const { active } = useAppStore();

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
    const { url, date, requestType } = form.getFieldsValue();
    const query = {
      from: 1,
      size: defaultSize,
      appId: active,
      url,
      beginTime: date ? date[0].format('YYYY-MM-DD 00:00:00') : undefined,
      endTime: date ? date[1].format('YYYY-MM-DD 23:59:59') : undefined,
      requestType,
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
    const { url, date, requestType } = form.getFieldsValue();
    const query = {
      from: pagination.current,
      size: pagination.pageSize,
      appId: active,
      url,
      beginTime: date ? date[0].format('YYYY-MM-DD 00:00:00') : undefined,
      endTime: date ? date[1].format('YYYY-MM-DD 23:59:59') : undefined,
      requestType,
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

  const search = async(searchQuery: GetHttpListReq) => {
    setLoading(true);
    const { data: { total, data } } = await getHttpList(searchQuery);
    setTotal(total);
    setData(data.map((item) => ({
      key: item._id,
      ...item._source,
    })));
    setLoading(false);
  };

  useEffect(() => {
    if(active){
      toReset();
    }
  }, [active]);

  return (
    <Card title="请求查询">
      <Form
        form={form}
        style={{ paddingBottom: 20 }}
        name="horizontal_login"
        layout="inline">
        <Form.Item
          name="url"
          label="接口地址"
        >
          <Input
            placeholder="请输入接口地址" />
        </Form.Item>
        <Form.Item
          name="date"
          label="日期"
          initialValue={[dayjs(), dayjs()]}
        >
          <DatePicker.RangePicker/>
        </Form.Item>
        <Form.Item
          name="requestType"
          initialValue=""
          label="请求状态">
          <Radio.Group>
            <Radio value="">不限</Radio>
            <Radio value="done">成功</Radio>
            <Radio value="error">失败</Radio>
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
        columns={httpTableColumns(sorter)}
        dataSource={data}
        onChange={onTableChange}
        pagination={{
          ...pagination,
          total,
        }}
        scroll={{ x: 1300 }}
      />
    </Card>

  );
};

export default HttpSearch;
