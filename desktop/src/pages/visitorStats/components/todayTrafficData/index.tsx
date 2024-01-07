import React from 'react';
import cls from 'classnames';
import styles from './index.module.less';
import { Card } from '@/src/components';
import downPng from '@/src/images/down.png';
import upPng from '@/src/images/up.png';
export const TodayTrafficData = () => (
  <Card
    title="今日流量">
    <div className={styles.allStatus}>
      <div className={styles.statusNumWrap}>
        <div className={styles.numItem}>
          <div className={styles.numItemTitle}>用户总数</div>
          <div className={styles.numItemValue}>23232</div>
          <div className={styles.lastDay}>
            <span>较昨日</span>
            <span className={styles.up}>20.3%</span>
            <img
              src={downPng}
              alt="" />
          </div>
        </div>
        <div className={styles.numItem}>
          <div className={styles.numItemTitle}>活跃人数</div>
          <div className={styles.numItemValue}>23232</div>
          <div className={styles.lastDay}>
            <span>较昨日</span>
            <span className={styles.up}>20.3%</span>
            <img
              src={upPng}
              alt="" />
          </div>
        </div>
        <div className={styles.numItem}>
          <div className={styles.numItemTitle}>新用户数</div>
          <div className={styles.numItemValue}>23232</div>
          <div className={styles.lastDay}>
            <span>较昨日</span>
            <span className={styles.up}>20.3%</span>
            <img
              src={downPng}
              alt="" />
          </div>
        </div>
        <div className={styles.numItem}>
          <div className={styles.numItemTitle}>访问量</div>
          <div className={styles.numItemValue}>23232</div>
          <div className={styles.lastDay}>
            <span>较昨日</span>
            <span className={styles.up}>20.3%</span>
            <img
              src={downPng}
              alt="" />
          </div>
        </div>
        <div className={styles.numItem}>
          <div className={styles.numItemTitle}>IP数</div>
          <div className={styles.numItemValue}>23232</div>
          <div className={styles.lastDay}>
            <span>较昨日</span>
            <span className={styles.up}>20.3%</span>
            <img
              src={downPng}
              alt="" />
          </div>
        </div>
      </div>
    </div>
  </Card>
);
