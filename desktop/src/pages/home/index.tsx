import React, { useEffect, useState } from 'react';
import { Empty, Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { AddApplication } from './components/addApplication';
import { AppItem } from './components/appItem';
import styles from './index.module.less';
import { useAppStore } from '@/src/hooks';
const Home = () => {
  const { apps, appDispatch } = useAppStore();

  const [showAdd, setShow] = useState(false);

  useEffect(() => {
    appDispatch.getAppList();
  }, []);

  return (
    <>
      {apps.length === 0 ? (
        <div className={styles.empty}>
          <Empty description={
            <>
              <span>您还没有应用，快去创建应用吧！</span>
              <br />
              <br />
              <Button
                type="primary"
                onClick={() => {
                  setShow(true);
                }}
                icon={<PlusCircleFilled />}>立即创建</Button>
            </>
          }/>
        </div>
      )
        : <>
          <Button
            style={{ marginBottom: 20 }}
            type="primary"
            onClick={() => {
              setShow(true);
            }}
            icon={<PlusCircleFilled />}>创建应用</Button>
          <div className={styles['app-wrap']}>
            {
              apps.map((item) => <AppItem
                key={item.id}
                appInfo={item} />)
            }
          </div>
        </>
      }
      <AddApplication
        open={showAdd}
        onClose={() => {
          setShow(false);
        }} />
    </>
  );

};

export default Home;
