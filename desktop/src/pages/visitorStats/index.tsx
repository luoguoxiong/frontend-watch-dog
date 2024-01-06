import React from 'react';
import cls from 'classnames';
import styles from './index.module.less';
import { useAppStore } from '@/src/hooks';
const VisitorStats = () => {
  const { active } = useAppStore();
  return (
    <>
      <div className={styles.card}>
        <div className={styles.title}>流量数据</div>
        <div className={styles.allStatus}>
          <div className={styles.statusNumWrap}>
            <div className={styles.numItem}>
              <div className={styles.numItemTitle}>用户总数</div>
              <div className={styles.numItemValue}>23232</div>
            </div>
            <div className={styles.numItem}>
              <div className={styles.numItemTitle}>今日活跃人数</div>
              <div className={styles.numItemValue}>23232</div>
            </div>
            <div className={styles.numItem}>
              <div className={styles.numItemTitle}>新用户数</div>
              <div className={styles.numItemValue}>23232</div>
            </div>
          </div>
          <div className={styles.statusChart} />
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.title}>新用户走势</div>
        <div className={styles.newUserLineWrap} />
      </div>

      <div className={styles.card}>
        <div className={styles.title}>PV、UV、IP分时走势</div>
        <div className={styles.newUserLineWrap} />
      </div>

      <div className={styles.card}>
        <div className={styles.title}>PV、UV、IP 每日走势</div>
        <div className={styles.newUserLineWrap} />
      </div>
    </>
  );
};
export default VisitorStats;
