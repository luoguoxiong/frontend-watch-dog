import React from 'react';
import './app.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GlobalModal } from '@/src/components/globalModal';
import { routes } from '@/src/router';
import { store } from '@/src/models/store';
const router = createBrowserRouter(routes);

setTimeout(() => {
  console.log(b);
}, 1000);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <GlobalModal />
    </Provider>
  );
}

export default App;
