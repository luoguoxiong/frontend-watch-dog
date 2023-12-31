import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from '@/src/app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ConfigProvider theme={{
    components: {
      Menu: {
        darkItemBg: '#4684ff',
        groupTitleFontSize: 16,
        iconSize: 16,
        subMenuItemBg: '#4684ff',
        itemActiveBg: 'green',
      },
    },
  }}>
    <App />
  </ConfigProvider>
);
