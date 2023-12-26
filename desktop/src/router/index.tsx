
import React from 'react';
const Login = React.lazy(() => import('@/src/pages/login'));
const Home = React.lazy(() => import('@/src/pages/home'));
const TrafficStats = React.lazy(() => import('@/src/pages/trafficStats'));
export const routes = [
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/home',
    element: Home,
  },
];

export const subRoutes = [
  {
    path: '/home/trafficStats',
    element: TrafficStats,
  },
];


