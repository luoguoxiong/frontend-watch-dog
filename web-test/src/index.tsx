import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/src/app';
export interface PageModelIn {
  /** 应用AppId */
  appId:string
  /** 是否是首屏 */
  isFirst:boolean
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
  pageUrl:"/",
  userId:Math.random()>0.5?"":`${Math.random()}`,
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
testTask()
// const id = setInterval(()=>{
//   index++
//   testTask()
//   if(index===1000){
//     clearInterval(id)
//   }
// },10)
