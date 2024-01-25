import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Monitor } from './sdk';
import App from '@/src/app';

new Monitor({
  appId: 'ai601fyz1706089185530',
  api: 'http://localhost:7001/report',
  cacheMax: 1,
  webVitalsTimeouts: 10000,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 在这里处理请求完成后的逻辑
    console.log('请求参数：', xhr.responseText);
  }
};

// 设置请求参数
const params = '?param1=value1&param2=value2';
xhr.open('get', 'http://localhost:7001/api/desktop/updateAppStatus', true);
xhr.send(params);

root.render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      components: {
        Menu: {
          iconSize: 16,
          subMenuItemBg: '#4684ff',
          // 菜单项背景
          darkItemBg: '#4684ff',
          // 菜单项文字颜色
          darkItemColor: 'white',
          // 菜单项文字hover颜色
          darkItemHoverBg: 'rgba(255,255,255,0.2)',
          // 菜单项文字颜色Hover颜色
          darkItemHoverColor: 'rgba(255,255,255,0.8)',
          // 菜单项选中背景
          darkItemSelectedBg: 'rgba(255, 255, 255,0.5)',
          // 菜单项选中颜色
          darkItemSelectedColor: 'white',
          //
          darkSubMenuItemBg: '#4684ff',
        },
      },
    }}>
    <App />
  </ConfigProvider>
);
