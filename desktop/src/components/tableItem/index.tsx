import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import styles from './index.module.less';
import { getStatusColor } from '@/src/utils/getStatusColor';
import { copyTextToClipboard } from '@/src/utils';
const renderHttpCost = (val: number) => (
  <span style={{ color: getStatusColor(val, 'requestTime') }}>{val.toFixed(0)}ms</span>
);

const renderUrl = (url: string, maxLen: number, copy: boolean) => {
  if(!url) {return '-';}
  let str = url;
  if(url.length > maxLen){
    str = `${str.substring(0, maxLen + 2)}...`;
  }
  return (
    <>
      <Tooltip title={
        <span className={styles.text}>
          {decodeURIComponent(url.replace(/\+/g, ' '))}
        </span>
      }>
        <span className={styles.text}>
          {decodeURIComponent(str.replace(/\+/g, ' '))}
        </span>
      </Tooltip>
      {
        copy && <CopyOutlined
          style={{ marginLeft: 4 }}
          onClick={() => {
            copyTextToClipboard(
              decodeURIComponent(url.replace(/\+/g, ' '))
            );
          }} />
      }
    </>
  );
};

const renderText = (url: string, maxLen: number, copy: boolean) => {
  if(url === '') return '-';
  let str = url;
  if(url.length > maxLen){
    str = `${str.substring(0, maxLen + 2)}...`;
  }
  return (
    <>
      <Tooltip title={
        <span className={styles.text}>
          {url}
        </span>
      }>
        <span className={styles.text}>
          {str}
        </span>
      </Tooltip>

      {
        copy && <CopyOutlined
          style={{ marginLeft: 4 }}
          onClick={() => {
            copyTextToClipboard(url);
          }} />
      }
    </>
  );
};

const renderTime = (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss');

export const TableItem = {
  renderHttpCost,
  renderUrl,
  renderText,
  renderTime,
};
