import React from 'react';
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
const VisitorStats = () => {
  const { active } = useAppStore();
  return (
    <>
      <TodayTrafficData />
      <UserData />
      <TrafficTimeLine />
      <TrafficDayLine />
    </>
  );
};
export default VisitorStats;
