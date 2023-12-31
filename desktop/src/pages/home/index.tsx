import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

const { Header, Sider, Content, Footer } = Layout;
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import stylels from './index.module.less';
import { RootState, Dispatch } from '@/src/models/store';
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
    children: [{
      key: 1,
      icon: React.createElement(icon),
      label: `nav ${index + 1}`,
    }],
  }),
);

function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { userInfo, isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.user.getUserInfo();
  }, []);

  if(isLoading){
    return '加载中';
  }
  if(!userInfo?.id){
    return <Navigate to="/login" />;
  }
  const leftSideWidth = collapsed ? 80 : 255;
  return (
    <div
      className={stylels.content}>
      <div
        className={stylels.left}
        style={{ width: leftSideWidth }}>
        <Sider
          breakpoint="lg"
          style={{ width: leftSideWidth, maxWidth: leftSideWidth }}
          collapsedWidth="0"
          collapsed={false}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className={stylels.logo}>
            2323
          </div>
          <Menu
            theme="dark"
            style={{ width: leftSideWidth, fontSize: 18 }}
            mode="inline"
            defaultSelectedKeys={['4']}
            items={items} />
        </Sider>
      </div>
      <div className={stylels.right} />
    </div>
    // <Layout style={{ height: '100vh' }}>

  //   <Layout>
  //     <Header style={{ padding: 0, background: colorBgContainer }} />
  //     <Content style={{ margin: '24px 16px 0' }}>
  //       <div
  //         style={{
  //           padding: 24,
  //           minHeight: 360,
  //           background: colorBgContainer,
  //           borderRadius: borderRadiusLG,
  //         }}
  //       >
  //         <Outlet />
  //       </div>
  //     </Content>
  //     <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
  //   </Layout>
  // </Layout>
  );
}

export default Home;
