import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import { Monitor } from '@frontend-watch-dog/web-sdk';
import App from './App';

new Monitor({
  appId: 'wmyz',
  api: 'http://localhost:7001/test',
  cacheMax: 10,
  webVitalsTimeouts: 10000,
});



// 代码异常
const a = [{ a: 1 }, { a: [] }];
// const script = document.createElement('script');
// script.src = 'https://stest.com';
// document.body.appendChild(script);
// ===============
setTimeout(() => {
  a.map((item) => {
    item.a.map((temp) => {
      console.log(temp);
    });
  });
}, 0);
// fetch 监听异常
// fetch('/api/abc', {
//   method: 'get',
// }).then((res) => {
//   console.log('res', res);
// });
// ========================

// xmlhttp请求异常
// const xhr2 = new XMLHttpRequest();

// xhr2.onreadystatechange = (ev) => {
//   console.log('111',11);
// };
// // xhr2.open('post', '/desktop');
// xhr2.open("get", "/api/abc2", true);
// xhr2.setRequestHeader('header', '1');
// xhr2.send();
// ====================

// prmoise 异常
const promiseTest = () => new Promise((res, rej) => {
  rej(12);
});
promiseTest().then((res) => {
  console.log(res);
});

ReactDOM.render( <React.StrictMode>
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
                 </React.StrictMode>, document.getElementById('root'));
