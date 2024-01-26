import React, { useEffect, useState } from 'react';
import { Drawer, Table } from 'antd';
import { getHttpList } from '@/src/api';
import { useAppStore } from '@/src/hooks';
import { httpTableColumns } from '@/src/components/httpTableColumns';

const defaultSize = 10;
interface DetailMsg{
  url: string;
  requestType: 'done' | 'error' | string;
  beginTime: string;
  endTime: string;
  open: boolean;
}
interface HttpDetailIn{
  detail: DetailMsg;
  onClose;
}
export const HttpDetail: React.FC<HttpDetailIn> = ({ detail, onClose }) => {
  const { url, requestType, beginTime, endTime, open } = detail;
  console.log(detail.requestType);

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

  const toReset = () => {
    setPageIn({
      current: 1,
      pageSize: defaultSize,
    });
    setSorter({
      sorterName: '',
      sorterKey: '',
    });
    search({
      appId: active,
      from: 1,
      size: defaultSize,
      url,
      beginTime,
      endTime,
      requestType,
    });
  };

  const onTableChange = (pagination, __, sorter: any) => {
    const query = {
      from: pagination.current,
      size: pagination.pageSize,
      appId: active,
      url,
      beginTime,
      endTime,
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
    if(open && active){
      toReset();
    }
  }, [open]);

  return (
    <Drawer
      title="接口详情"
      open={open}
      width={1100}
      onClose={ onClose}
    >
      <div style={{
        height: '100%',
        overflowY: 'auto',
      }}>
        <Table
          key="_id"
          sticky
          style={{
            top: -16,
          }}
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
      </div>

    </Drawer>
  );
};
