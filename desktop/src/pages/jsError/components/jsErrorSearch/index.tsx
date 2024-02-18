import React, { useEffect, useState } from 'react';
import { Alert, Button, DatePicker, Drawer, Form, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import styles from './index.module.less';
import { Card, CodeShow } from '@/src/components';
import { getJsErrorList, getNearbyCode } from '@/src/api';
import { useAppStore } from '@/src/hooks';


export const JsErrorSearch = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState([]);

  const { active } = useAppStore();

  const [loading, setLoading] = useState(false);

  const [codeMsg, setCodeMsg] = useState({
    open: false,
    code: [],
    originalPosition: {
      source: '',
      line: 0,
      column: 0,
      name: '',
    },
    start: 12,
  });

  const toSearch = async() => {
    const { date } = form.getFieldsValue();
    const query = {
      appId: active,
      beginTime: date ? date[0].format('YYYY-MM-DD 00:00:00') : undefined,
      endTime: date ? date[1].format('YYYY-MM-DD 23:59:59') : undefined,
    };
    search(query);
  };

  const toReset = () => {
    form.resetFields();
    search({
      appId: active,
      beginTime: dayjs().format('YYYY-MM-DD 00:00:00'),
      endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
    });
  };

  const search = async(searchQuery: AnalyseReq) => {
    setLoading(true);
    const { data } = await getJsErrorList(searchQuery);
    setData(data.map(((item, index) => {
      item.id = index;
      return item;
    })));
    setLoading(false);
  };

  const onUpLoadData = async(file: Blob, colno, lineno) => {
    const formData = new FormData();
    formData.append('sourcemapFile', file);
    formData.append('lineNumber', lineno);
    formData.append('columnNumber', colno);
    const { data } = await getNearbyCode(formData);
    setCodeMsg({
      ...data,
      open: true,
    });
  };

  const columns: TableColumnsType<JsErrorMsgItem> = [
    {
      title: '错误详情',
      dataIndex: 'pageUrl',
      key: 'pageUrl',
      width: 500,
      render: (_, data) => (
        <>
          <div>错误信息: {data.message}</div>
          <div>错误位置: {data.filename}({data.lineno}:{data.colno})</div>
        </>
      ),
    },
    {
      title: '错误数量',
      dataIndex: 'errorCount',
      key: 'errorCount',
      width: 100,
      sorter: (a, b) => a.errorCount - b.errorCount,
    },
    {
      title: '影响人数',
      dataIndex: 'userIds',
      key: 'userIds',
      width: 100,
      sorter: (a, b) => a.userIds.length - b.userIds.length,
      render: (val: string[]) => val.length,
    },
    {
      title: '源码解析',
      dataIndex: 'lineno',
      key: 'lineno',
      width: 100,
      render: (_, record) => <span className={styles.upload}>
        <a>解析</a>
        <input
          type="file"
          onChange={(e) => {
            onUpLoadData(e.target.files[0], record.colno, record.lineno);
          }}
          className={styles.input} />
      </span>,
    },
  ];

  useEffect(() => {
    if(active){
      toReset();
    }
  }, [active]);

  return (
    <Card title="异常查询">
      <Form
        form={form}
        style={{ paddingBottom: 20 }}
        name="horizontal_login"
        layout="inline">
        <Form.Item
          name="date"
          label="日期"
          initialValue={[dayjs(), dayjs()]}
        >
          <DatePicker.RangePicker/>
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
        rowKey={'id'}
        expandable={{
          expandedRowRender: (record) => {
            const list = record.stack.split('\n');
            return (
              <>
                {
                  list.map((item) => <p key={item}>{item}</p>)
                }
              </>
            );
          } }}
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1300 }}
      />
      <Drawer
        width={800}
        title={'代码解析结果'}
        onClose={(() => {
          setCodeMsg({
            ...codeMsg,
            open: false,
          });
        })}
        open={codeMsg.open}>
        <Alert
          message={
            <span>
              源代码位置：{codeMsg.originalPosition.source}{`(${codeMsg.originalPosition.line}, ${codeMsg.originalPosition.column})`}
            </span>
          }
          type="info" />

        <CodeShow
          start={codeMsg.start}
          hightLine={codeMsg.originalPosition?.line - codeMsg.start + 1}>
          {codeMsg.code.join('\n')}
        </CodeShow>
      </Drawer>
    </Card>
  );
};

