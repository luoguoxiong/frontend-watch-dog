import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import styles from './index.module.less';
import { Card, ShowTime } from '@/src/components';
import { RootState } from '@/src/models/store';
import { getAppAvgPerformance } from '@/src/api';
interface AvgItemIn{
  name: string;
  key: 'whiteTime' | 'fcp' | 'lcp' | 'fid' | 'ttfb' | 'fastRote' | 'slowRote';
  value: number;
  tip?: string;
}
export const AvgAppData = () => {
  const { active } = useSelector((state: RootState) => state.app);

  const [data, setAppData] = useState({
    whiteTime: 0,
    fcp: 0,
    lcp: 0,
    fid: 0,
    ttfb: 0,
    fastRote: 0,
    slowRote: 0,
  });

  const getDataValue = (data: object): any => {
    const obj = {};
    const keys = Object.keys(data);
    for(const key of keys){
      const item = data[key];
      if(item?.value || item.value === 0 || item.value === null){
        obj[key] = item.value;
      }else{
        obj[key] = item;
      }
    }
    return obj;
  };

  useEffect(() => {
    getAppAvgPerformance(active).then(({ data }) => {
      setAppData(getDataValue(data));
    });
  }, [active]);

  const avgData: AvgItemIn[] = [
    {
      name: '秒开率',
      key: 'fastRote',
      value: data.fastRote || 0,
      tip: '1s内打开页面百分比',
    },
    {
      name: '慢开率',
      key: 'slowRote',
      value: data.slowRote || 0,
      tip: '5s以上打开页面百分比',
    },
    {
      name: '首屏性能',
      key: 'whiteTime',
      value: data.whiteTime || 0,
    },
    {
      name: 'FCP',
      key: 'fcp',
      value: data.fcp || 0,
      tip: '首次内容绘制时间',
    },
    {
      name: 'LCP',
      key: 'lcp',
      value: data.lcp || 0,
      tip: '最大内容绘制时间，该指标会在用户首次交互后停止记录',
    },
    {
      name: 'FID',
      key: 'fid',
      value: data.fid || 0,
      tip: '用户首次输入到页面响应的时间',
    },
    {
      name: 'TTFB',
      key: 'ttfb',
      value: data.ttfb || 0,
      tip: '首字节时间',
    },
  ];
  return (
    <Card title="应用综合性能">
      <div className={styles.content}>
        {
          avgData.map((item) => <div
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
              {
                (item.key === 'fastRote' || item.key === 'slowRote') ? (
                  `${(item.value * 100).toFixed(0)}%`
                ) : <ShowTime
                  name={item.key}
                  value={item.value} />
              }
            </div>
          </div>)
        }
      </div>
    </Card>
  );
};
