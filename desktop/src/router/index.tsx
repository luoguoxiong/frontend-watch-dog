
import React, { Suspense, lazy, ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';
import { AppstoreOutlined, BarChartOutlined } from '@ant-design/icons';
import { Loading } from '@/src/components/loading';
const lazyLoad = (dynamicImport: () => Promise<{ default: ComponentType<any> }>) => {
  const Component = lazy(dynamicImport);
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export const munuRouters = [
  {
    path: '/',
    name: '应用列表',
    icon: AppstoreOutlined,
    element: lazyLoad(() => import('../pages/home')),
  },
  {
    path: '/visitorStats',
    name: '访客统计',
    icon: BarChartOutlined,
    element: lazyLoad(() => import('../pages/visitorStats')),
  },
];

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: lazyLoad(() => import('../pages/login')),
  },
  {
    path: '/',
    element: lazyLoad(() => import('../pages/content')),
    children: [
      ...munuRouters,
      {
        path: '/*',
        element: lazyLoad(() => import('@/src/components/notFound')),
      },
    ],
  },
  {
    path: '/test',
    element: lazyLoad(() => import('../pages/home')),
  },
  {
    path: '*',
    element: lazyLoad(() => import('@/src/components/notFound')),
  },
];


