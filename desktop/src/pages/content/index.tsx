import React, { useState } from 'react';
import { Layout, Menu, Modal } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import cls from 'classnames';
import { MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import stylels from './index.module.less';
import { loginOut } from '@/src/api';
import logoPng from '@/src/images/logo.png';
import { checkAppStatus } from '@/src/components';
import { munuRouters } from '@/src/router';
import { RootState } from '@/src/models/store';
const { Sider } = Layout;

function Home() {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [openMenuKey, setKey] = useState(pathname);

  const { apps, isLoading } = useSelector((state: RootState) => state.app);

  const menus = React.useMemo(() => {
    if(isLoading){
      return [];
    }
    let menus;
    if(apps.length === 0){
      menus = munuRouters.filter(((item) => item.path === '/'));
    }else{
      menus = munuRouters;
    }
    return menus.map(
      (item) => ({
        key: item.path,
        icon: React.createElement(item.icon),
        label: item.name,
      }),
    );
  }, [apps, isLoading]);

  const leftSideWidth = collapsed ? 80 : 255;

  return (
    <div
      className={stylels.content}>
      <div
        className={stylels.left}
        style={{ width: leftSideWidth }}>
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
        {
          <div className={stylels.logo}>
            <div className={stylels['logo-content']}>
              <img
                src={logoPng}
                alt=""/>
              <span>前端监控平台</span>
            </div>
          </div>
        }
        <div className={stylels['menu-wrap']}>
          <Sider
            breakpoint="lg"
            style={{ width: leftSideWidth, maxWidth: leftSideWidth }}
            collapsed={collapsed}
            collapsible
            trigger={null}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              selectedKeys={[openMenuKey]}
              onClick={
                (val) => {
                  setKey(val.key);
                }
              }
              theme="dark"
              style={{ width: leftSideWidth, fontSize: 16 }}
              mode="inline"
              defaultSelectedKeys={['4']}
              onSelect={(info) => {
                navigate(info.key);
              }}
              items={menus} />
          </Sider>
        </div>
      </div>
      <div
        className={stylels.right}
        style={{ width: `calc(100vw - ${leftSideWidth}px)`, marginLeft: leftSideWidth }}>

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
                    dispatch.user.resetUserInfo();
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



export default checkAppStatus(Home);
