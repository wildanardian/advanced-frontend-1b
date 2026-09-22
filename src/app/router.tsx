import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import Home from '@/features/home/Home';
import Profile from '@/features/profile/Profile';
import { Watchlist } from '@/features/watchlist/Watchlist';
import Series from '@/features/series/Series';
import Film from '@/features/film/Film';

import GuestLayout from '@/components/layout/GuestLayout';
import Login from '@/features/auth/Login';
import Register from '@/features/auth/Register';
import ErrorPage from '@/features/error/Error';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import Watch from '@/features/watch/Watch';
import WatchLayout from '@/components/layout/WatchLayout';
import Subscription from '@/features/subscription/Subscription';
import Payment from '@/features/payment/Payment';
import AdminLayout from '@/components/layout/AdminLayout';
import Dashboard from '@/features/admin/Dashboard';


import AdminFilm from '@/features/admin/film/Film';
import AdminSeries from '@/features/admin/series/Series';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/series', element: <Series /> },
          { path: '/film', element: <Film /> },
          { path: '/watchlist', element: <Watchlist /> },
          { path: '/profile', element: <Profile /> },
          { path: '/subscription', element: <Subscription /> },
          { path: '/payment', element: <Payment /> }
        ],
      },
      {
        element: <WatchLayout />,
        children: [
          { path: '/watch/film/:id', element: <Watch type="film" /> },
          { path: '/watch/series/:id', element: <Watch type="series" /> },
        ]
      }
    ]
  },
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: <Dashboard /> },
          { path: '/admin/manage-film', element: <AdminFilm /> },
          { path: '/admin/manage-series', element: <AdminSeries />},
          { path: '/admin/manage-user', element: <div>Kelola User</div> },
          { path: '/admin/manage-subscription', element: <div>Kelola Subscription</div> }
        ],
      }
    ],
  },
  {
    element: <GuestLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);