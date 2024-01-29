import React, { useEffect, useState } from 'react';
import { Drawer, Table } from 'antd';
import { getHttpList } from '@/src/api';
import { useAppStore } from '@/src/hooks';
import { showHttpDetail } from '@/src/utils/enventBus';
import { httpTableColumns } from '@/src/components/httpTableColumns';

const initQuery = {
  from: 1,
  size: 10,
  sorterName: '',
  sorterKey: null,
  link: '',
  beginTime: '',
  endTime: '',
  requestType: '',
};
export const HttpDetail = () => {

  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);

  const { active } = useAppStore();

  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState<GetHttpListReq>({
    appId: active,
    ...initQuery,
  });

  const [total, setTotal] = useState(0);

  const onTableChange = (pagination, __, sorter: any) => {
    const parmas = {
      ...query,
      appId: active,
      from: pagination.current,
      size: pagination.pageSize,
      sorterName: sorter.field,
      sorterKey: sorter.order,
    };
    setQuery(parmas);
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
      showHttpDetail.subscribe((data) => {
        setOpen(true);
        setQuery({
          appId: active,
          ...initQuery,
          ...data,
        });
      });
      return () => {
        showHttpDetail.unsubscribe();
      };
    }
  }, [active]);

  useEffect(() => {
    if(open){
      search({
        ...query,
        sorterName: query.sorterKey ? query.sorterName : '',
        sorterKey: query.sorterKey ? query.sorterKey === 'ascend' ? 'asc' : 'desc' : '',
      });
    }
  }, [query, open]);

  return (
    <Drawer
      title="接口详情"
      open={open}
      width={'80%'}
      onClose={() => {
        setOpen(false);
      }}
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
          columns={httpTableColumns({
            sorterName: query.sorterName,
            sorterKey: query.sorterKey as any,
          })}
          dataSource={data}
          onChange={onTableChange}
          pagination={{
            current: query.from,
            pageSize: query.size,
            total,
          }}
          scroll={{ x: 1300 }}
        />
      </div>

    </Drawer>
  );
};
