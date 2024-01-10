import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import styles from './index.module.less';
import { LineChart } from './components/newUserLine';
import { TodayTrafficData } from './components/todayTrafficData';
import { UserData } from './components/userData';
import { TrafficTimeLine } from './components/trafficTimeLine';
import { TrafficDayLine } from './components/trafficDayLine';
import { useAppStore } from '@/src/hooks';
import { Card } from '@/src/components';
import downPng from '@/src/images/down.png';
import upPng from '@/src/images/up.png';
import { getWebVisitTop } from '@/src/api';
const VisitorStats = () => {
  const { active } = useAppStore();
  const [pages, setPages] = useState([]);
  useEffect(() => {
    getWebVisitTop({
      appId: active,
      type: 'webVisit',
    }).then((res) => {
      const page = {
        label: '全部',
        value: '',
      };
      setPages([page, ...res.data]);
    });
  }, []);
  return (
    <>
      <TodayTrafficData appId={active} />
      <UserData />
      <TrafficTimeLine
        appId={active}
        pages={pages} />
      <TrafficDayLine
        appId={active}
        pages={pages}
      />
    </>
  );
};
export default VisitorStats;
