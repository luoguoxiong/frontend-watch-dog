import React from 'react';
import styles from './index.module.less';
import { useAppStore } from '@/src/hooks';
import { TopBar } from '@/src/components';
const TopAnalyse = () => {
  const { active } = useAppStore();
  return (
    <div className={styles.wrap}>
      <div className={styles.item}>
        <TopBar title="网页访问量" />
        <TopBar title="网页访问量" />
        <TopBar title="网页访问量" />
      </div>
      <div className={styles.item}>
        <TopBar title="网页访问量" />
        <TopBar title="网页访问量" />
        <TopBar title="网页访问量" />
      </div>
    </div>
  );
};

export default TopAnalyse;
