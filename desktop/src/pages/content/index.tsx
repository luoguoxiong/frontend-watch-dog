import React, { useState } from 'react';
import { Layout, Menu, Modal } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import cls from 'classnames';
import { MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import stylels from './index.module.less';
import { loginOut } from '@/src/api';
import logoPng from '@/src/images/logo.png';
import { checkLoginStatus } from '@/src/components/checkLoginStatus';
import { munuRouters } from '@/src/router';
import { Dispatch } from '@/src/models/store';
const { Sider } = Layout;

const menus = munuRouters.map(
  (item) => ({
    key: item.path,
    icon: React.createElement(item.icon),
    label: item.name,
  }),
);

function Home() {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch<Dispatch>();

  const navigate = useNavigate();

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
          collapsed={collapsed}
          collapsible
          trigger={null}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            className={stylels['left-wrap']}
            style={{ width: leftSideWidth }}>
            {
              !collapsed
                ? <div className={stylels.logo}>
                  <img
                    src={logoPng}
                    alt=""/>
                  <span>前端监控平台</span>
                </div>
                : <div className={stylels['single-logo']}>
                  <img
                    src={logoPng}
                    alt=""/>
                </div>
            }

            <div className={stylels['menu-wrap']}>
              <Menu
                theme="dark"
                style={{ width: leftSideWidth, fontSize: 16 }}
                mode="inline"
                defaultSelectedKeys={['4']}
                onSelect={(info) => {
                  navigate(info.key);
                }}
                items={menus} />
            </div>
          </div>
        </Sider>
      </div>
      <div
        className={stylels.right}
        style={{ width: `calc(100vh - ${leftSideWidth}px)` }}>
        <svg
          className={cls(stylels.prefixCircle, stylels.top)}
          width="35"
          height="35"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M35,0 A35,35 0 0,0 0,35 L0,0 Z"
            fill="#4684ff"
            stroke="#4684ff" />
        </svg>
        <svg
          width="35"
          height="35"
          className={cls(stylels.prefixCircle, stylels.bottom)}
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,0 A35,35 0 0,0 35,35 L0,35 Z"
            fill="#4684ff"
            stroke="#4684ff" />
        </svg>
        <div className={stylels['right-wrap']}>
          <div className={stylels.header} >
            {
              collapsed
                ? <MenuUnfoldOutlined
                  onClick={() => {
                    setCollapsed(!collapsed);
                  }} />
                : <MenuFoldOutlined
                  onClick={() => {
                    setCollapsed(!collapsed);
                  }} />
            }
            <PoweroffOutlined
              onClick={() => {
                Modal.confirm({
                  title: '确定退出登录？',
                  okText: '确定',
                  cancelText: '取消',
                  onOk: async() => {
                    await loginOut();
                    dispatch.user.loginOut();
                  },
                });
              }}
              className={stylels.poweroffOutlined} />
          </div>
          <div className={stylels['page-wrap']}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}



export default checkLoginStatus(Home);
