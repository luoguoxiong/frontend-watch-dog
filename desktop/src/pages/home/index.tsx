import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { NotFound } from '@/src/components';
import { subRoutes } from '@/src/router';

function Home() {
  return (
    <Routes>
      {
        subRoutes.map((item) => <Route
          path={item.path}
          key={item.path}
          element={
            <React.Suspense fallback="加载中...">
              <item.element />
            </React.Suspense>
          }
        />)
      }
    </Routes>
  );
}

export default Home;

