import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { useSelector } from 'react-redux';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Card } from '@/src/components';
import { useEchart } from '@/src/hooks';
import { getHttpErrorRang } from '@/src/api';
import { RootState } from '@/src/models/store';
export const HttpErrorDayLine = () => {
  const { ref, setOption } = useEchart();
  const { active } = useSelector((state: RootState) => state.app);
  const [date, setDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs().add(-31, 'day'), dayjs()]);

  const getData = async() => {
    const { data } = await getHttpErrorRang({
      appId: active,
      beginTime: date[0].format('YYYY-MM-DD:00:00:00'),
      endTime: date[1].format('YYYY-MM-DD 23:59:59'),
    });

    const [xAxis, yAxis] = data.reduce(([xAxis, yAxis]: any, cur) => {
      xAxis.push(dayjs(cur.label).format('MM-DD'));
      yAxis.push(cur.value);
      return [xAxis, yAxis];
    }, [[], []]);


    const maxValue = Math.max(...yAxis);

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
          data: xAxis,
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
          data: yAxis,
        },
      ],
    };
    setOption(option);
  };
  useEffect(() => {
    if(active && date){
      getData();
    }
  }, [active, date]);
  return (
    <Card
      title="接口概况"
      prefixHeadRight={
        <>
          <DatePicker.RangePicker
            value={date}
            disabledDate={(current) => {
              const today = dayjs(dayjs().add(1, 'day').format('YYYY-MM-DD'));
              return current.isAfter(today);
            }}
            onChange={(value) => {
              setDate(value);
            }} />
        </>
      }
    >
      <div
        style={{ height: 200 }}
        ref={ref} />
    </Card>
  );
};
