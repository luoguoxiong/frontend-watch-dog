import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ShowTime } from '../index';
import styles from './index.module.less';
interface AvgItemIn{
  name: string;
  key: 'whiteTime' | 'fcp' | 'lcp' | 'fid' | 'ttfb';
  value: number;
  tip?: string;
}
export const AvgData = () => {
  const data: AvgItemIn[] = [{
    name: '首屏性能',
    key: 'whiteTime',
    value: 888,
  },
  {
    name: 'FCP',
    key: 'fcp',
    value: 888,
    tip: '首次内容绘制时间',
  },
  {
    name: 'LCP',
    key: 'lcp',
    value: 888,
    tip: '最大内容绘制时间，该指标会在用户首次交互后停止记录',
  },
  {
    name: 'FID',
    key: 'fid',
    value: 888,
    tip: '用户首次与页面交互时响应时间',
  },
  {
    name: 'TTFB',
    key: 'ttfb',
    value: 888,
    tip: '首字节时间',
  },
  ];
  return (
    <div className={styles.content}>
      {
        data.map((item) => <div
          className={styles.item}
          key={item.key}>
          <div className={styles.title}>
            <span>{item.name}</span>
            {
              item.tip && (
                <Tooltip
                  className={styles.tip}
                  title={item.tip}>
                  <QuestionCircleOutlined />
                </Tooltip>
              )
            }
          </div>
          <div
            className={styles.value}>
            <ShowTime
              name={item.key}
              value={item.value} />
          </div>
        </div>)
      }
    </div>
  );
};
