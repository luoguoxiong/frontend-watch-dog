import React from 'react';
import './app.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { NotFound } from '@/src/components';
import { routes } from '@/src/router';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" />} />
        {
          routes.map((item) => <Route
            path={item.path}
            key={item.path}
            element={
              <React.Suspense fallback="加载中...">
                <item.element />
              </React.Suspense>
            }
          />)
        }
        <Route
          path="*"
          element={
            <React.Suspense fallback="加载中...">
              <NotFound />
            </React.Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
