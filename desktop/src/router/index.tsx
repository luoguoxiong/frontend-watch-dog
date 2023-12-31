
import React, { Suspense, lazy, ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';

const lazyLoad = (dynamicImport: () => Promise<{ default: ComponentType<any> }>) => {
  const Component = lazy(dynamicImport);
  return (
    <Suspense fallback={'加载中...'}>
      <Component />
    </Suspense>
  );
};
export const routes: RouteObject[] = [
  {
    path: '/login',
    element: lazyLoad(() => import('../pages/login')),
  },
  {
    path: '/',
    element: lazyLoad(() => import('../pages/home')),
    children: [{
      path: '/',
      element: lazyLoad(() => import('../pages/trafficStats')),
    },
    {
      path: '/*',
      element: lazyLoad(() => import('@/src/components/notFound')),
    },
    ],
  },
  {
    path: '*',
    element: lazyLoad(() => import('@/src/components/notFound')),
  },
];


