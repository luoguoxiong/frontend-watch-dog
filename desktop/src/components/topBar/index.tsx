import React, { useEffect } from 'react';
import { Card } from '@/src/components';
import { useEchart } from '@/src/hooks';
interface TopBarIn{
  title: string;
}
export const TopBar: React.FC<TopBarIn> = ({ title }) => {

  const { ref, setOption } = useEchart();
  useEffect(() => {
    setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
      },
      series: [
        {
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230],
        },
      ],
    });
  }, []);
  return (
    <Card title={title}>
      <div
        ref={ref}
        style={{ height: 200 }} />
    </Card>
  );
};
