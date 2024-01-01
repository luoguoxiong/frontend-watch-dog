import React from 'react';
import { Spin } from 'antd';
import styles from './index.module.less';

export const Loading = () => (
  <div className={styles.laoding}>
    <Spin style={{ height: 10 }} />
  </div>
);
