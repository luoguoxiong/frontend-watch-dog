import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/src/app';
import {onCLS, onFID, onLCP,onFCP,onTTFB,onINP} from 'web-vitals/attribution';

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    /**首次内容绘制 */
      onFCP(onPerfEntry);
      /**首字节时间 */
      onTTFB(onPerfEntry);
    /** 最大内容绘制*/
      onLCP(onPerfEntry);
      /**用户首次与页面交互 */
      onFID(onPerfEntry);
      /**累积布局偏移 */
      onCLS(onPerfEntry);
  }
};
reportWebVitals(console.log)

function getPerformanceMetrics() {
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const navigationStart = timing.navigationStart;

    // 白屏时间
    const blankScreenTime = timing.domComplete - navigationStart;

    // TTFP (Time To First Paint)
    const firstPaint = 'performance' in window &&
      'timing' in window.performance &&
      'chrome' in window.performance.timing
        ? window.performance.timing.firstPaint || 0
        : 0;
    const ttfp = firstPaint - navigationStart;

    // TTFB (Time To First Byte)
    const ttfb = timing.responseStart - navigationStart;

    // 页面加载时间
    const pageLoadTime = timing.loadEventEnd - navigationStart;

    // 页面渲染时间
    const pageRenderTime = timing.domComplete - navigationStart;

    // FCP (First Contentful Paint)
    const fcp = timing.domContentLoadedEventEnd - navigationStart;

    // LCP (Largest Contentful Paint)
    const lcp = Math.max(
      timing.loadEventEnd - navigationStart,
      timing.domContentLoadedEventEnd - navigationStart,
      timing.domComplete - navigationStart
    );

    // CLS (Cumulative Layout Shift)
    const clsEntries = performance.getEntriesByType('layout-shift');
    const cls = clsEntries.reduce((sum, entry) => sum + entry.value, 0);

    // FID (First Input Delay)
    const fidEntries = performance.getEntriesByType('first-input');
    const fid = fidEntries.length > 0 ? fidEntries[0].processingStart - fidEntries[0].startTime : 0;

    // 返回性能指标对象
    return {
      blankScreenTime,
      ttfp,
      ttfb,
      pageLoadTime,
      pageRenderTime,
      fcp,
      lcp,
      cls,
      fid
    };
  } else {
    console.error('Navigation Timing API is not supported.');
    return null;
  }
}

// 使用方法
const performanceMetrics = getPerformanceMetrics();
if (performanceMetrics) {
  console.log('Performance Metrics:', performanceMetrics);
}

export interface PageModelIn {
  /** 应用AppId */
  appId:string
  /** 是否是首屏 */
  isFirst: boolean
  /** 访问Url路径 */
  pageUrl:string
  /** 访问的域名 */
  origin?:string
  /** 用户ID */
  userId?:string
  /** 页面加时长 */
  loadTime?:number
  /** 页面Dns解析时长 */
  dnsTime?:number
  /** 页面TCP链接时长 */
  tcpTime?:number
  /** 页面白屏时间 */
  whiteTime?:number
  /** dom渲染时间 */
  domTime?:number
  /** 页面准备时间 */
  fetchTime?:number
  /** 页面重定向时间 */
  reirectTime?:number
  /** 页面请求完成时间 */
  requestTime?:number
}
const testTask = ()=>{
// 构建带参数的 URL
const apiUrl = 'http://localhost:7001/report';

const params:PageModelIn = {
  appId: 'luoguoxiong001',
  isFirst: Math.random()>0.5?true:false,
  origin:location.origin,
  pageUrl: `/${Math.floor(Math.random() * 100) + 1}`,
  userId:`${Math.floor(Math.random() * 100) + 1}`,
  loadTime:10,
  dnsTime:20,
  tcpTime:30,
  whiteTime:40,
  domTime:50,
  fetchTime:60,
  reirectTime:70,
  requestTime:80
};

const queryString = new URLSearchParams(params).toString();
const urlWithParams = `${apiUrl}?${queryString}`;
// 发送 GET 请求
fetch(urlWithParams,{method:"get"})
  .then(response => {
    // 处理响应
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // 处理返回的数据
    console.log(data);
  })
  .catch(error => {
    // 处理错误
    console.error('Fetch error:', error);
  });
}
let index = 0
const id = setInterval(()=>{
  index++
  testTask()
},10)

setTimeout(() => {
  ReactDOM.render(<div>111</div>,document.getElementById("root"))
}, 1000);