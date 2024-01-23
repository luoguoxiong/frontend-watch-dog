import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { Card } from '@/src/components';
import { useEchart } from '@/src/hooks';
export const HttpErrorDayLine = () => {
  const { ref, setOption } = useEchart();

  useEffect(() => {

    const maxValue = 5;
    const option = {
      grid: {
        top: 40,
        left: 0,
        right: 20,
        bottom: 0,
        containLabel: true,
      },
      legend: {
        data: ['异常数'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          type: 'category',
          data: [1, 2, 3],
          axisPointer: {
            type: 'shadow',
          },
          boundaryGap: false,
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: maxValue,
          interval: Math.ceil(maxValue / 5),
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: [
        {
          name: '异常数',
          type: 'line',
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(58,77,233,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(58,77,233,0.3)',
              },
            ]),
          },
          tooltip: {
            valueFormatter: function(value) {
              return `${value }`;
            },
          },
          data: [1, 5, 3],
        },
      ],
    };
    setOption(option);
  }, []);
  return (
    <Card title="接口概况">
      <div
        style={{ height: 200 }}
        ref={ref} />
    </Card>
  );
};
