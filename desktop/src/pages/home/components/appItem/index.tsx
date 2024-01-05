import React, { useState, useEffect }from 'react';
import { Skeleton } from 'antd';
import styles from './index.module.less';
import { PeropleCounter, Loading } from '@/src/components';
import { getAllUsers, getDayActiveUsers, getNewUsers } from '@/src/api';

interface AppItemIn{
  appInfo: AppInfo;
}
export const AppItem: React.FC<AppItemIn> = ({ appInfo }) => {

  const [appStatus, setInfo] = useState({
    isLoading: true,
    activeUsers: 0,
    allUsers: 0,
    newUsers: 0,
  });

  const { activeUsers, allUsers, newUsers, isLoading } = appStatus;

  const getAppInfo = async() => {
    setInfo({
      isLoading: false,
      ...appStatus,
    });
    const appId = appInfo.appId;
    const [activeUsers, allUsers, newUsers ] = await Promise.all([
      getDayActiveUsers({ appId }),
      getAllUsers({ appId }),
      getNewUsers({ appId }),
    ]);
    setInfo({
      isLoading: false,
      activeUsers: activeUsers.data,
      allUsers: allUsers.data,
      newUsers: newUsers.data,
    });
  };

  useEffect(() => {
    getAppInfo();
  }, [appInfo.appId]);

  return (
    <div className={styles.content}>
      {
        isLoading
          ? <Loading style={{ height: 200 }} />
          : <>
            <div className={styles.title}>{appInfo.appName}</div>
            <div className={styles.user}>
              <div>
                <span className={styles['sub-title']}>活跃用户数</span>
                <span className={styles.value}>
                  <PeropleCounter count={activeUsers} />
                </span>
              </div>
              <div>
                <span className={styles['sub-title']}>用户总数</span>
                <span className={styles.value}>
                  <PeropleCounter count={allUsers} />
                </span>
              </div>
              <div>
                <span className={styles['sub-title']}>新用户数</span>
                <span className={styles.value}>
                  <PeropleCounter count={newUsers} />
                </span>
              </div>
              <div>
                <span className={styles['sub-title']}>活跃趋势</span>
                <span className={styles.value}>
                  <PeropleCounter count={234343422} />
                </span>
              </div>
            </div>
          </>
      }
    </div>
  );
};
