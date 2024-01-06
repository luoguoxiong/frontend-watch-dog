import React, { useEffect, useRef, memo } from 'react';
import * as echarts from 'echarts';
import styles from './index.module.less';
interface LineIn{
  data: number[];
}
export const LineChart: React.FC<LineIn> = ({ data }) => {
  const ref = useRef();
  useEffect(() => {
    if(ref.current && data.length > 0){
      const chart = echarts.init(ref.current);
      const option = {
        grid: {
          top: 2,
          left: 0,
          right: 0,
          bottom: -10,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false,
          data: data,
        },
        yAxis: {
          type: 'value',
          show: false, // 隐藏X轴
          min: 0,
        },
        series: [
          {
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: data,
          },
        ],
      };
      chart.setOption(option);
    }
  }, [ref.current, data]);
  return (
    <div
      ref={ref}
      className={styles.wrap} />
  );
};

export const Line = memo(LineChart, (prev, next) => prev !== next);
