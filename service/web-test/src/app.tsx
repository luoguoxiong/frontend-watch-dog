import React from 'react';
import logo from '@/src/static/logo.svg';
import styles from '@/src/app.module.less';
import {Tabs,Form,Button,Input} from 'antd'
import './app.css';

function App() {
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  return (
  <>
    <Tabs destroyInactiveTabPane={true}>
    <Tabs.TabPane tab="项目 1" key="item-1">
      <Form form={form}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      </Form>
    </Tabs.TabPane>
    <Tabs.TabPane tab="项目 2" key="item-2">
  
    </Tabs.TabPane>
   
  </Tabs>
  <div style={{visibility:"visible"}}>
    <Form form={form2}>
    <Form.Item
        label="Username"
        name="username2"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username3"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      </Form>
    </div>
    <Button onClick={async ()=>{
     try {
     const data=  await form2.validateFields()
     console.log(data);
     
     } catch (error) {
      console.log('error',error);
      
     }
    }}>确认</Button>
  </>
  );
}

export default App;
