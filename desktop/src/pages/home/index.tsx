import React from 'react';
import { Empty, Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { AddApplication } from './components/addApplication';
import styles from './index.module.less';
const Home = () => (
  <>
    <div className={styles.empty}>
      <Empty description={
        <>
          <span>您还没有应用，快去创建应用吧！</span>
          <br />
          <br />
          <Button
            type="primary"
            icon={<PlusCircleFilled />}>立即创建</Button>
        </>
      }/>
    </div>
    <AddApplication />
  </>
);

export default Home;
