import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.page';
import { UserDishesPage } from './pages/User-Dishes/User-Dishes.page';
import { ProfilePage } from './pages/Profile/Profile.page';
import CreateDishPage from './pages/Create-Dish/Create-Dish.page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/user/:id/dishes',
    element: <UserDishesPage />,
  },
  {
    path: '/user/:id/dishes/create',
    element: <CreateDishPage />,
  },
  {
    path: '/user/:id/profile',
    element: <ProfilePage />,
  },
]);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
