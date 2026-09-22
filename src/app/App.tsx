import { RouterProvider } from 'react-router-dom';
import '../index.css';
import { AppProviders } from './providers';
import { router } from './router';
import { Provider } from 'react-redux';
import { useAppDispatch } from '@/slice/hooks';
import { useEffect } from 'react';
import { fetchWatchlist } from '@/slice/watchlistSlice';
import { store } from '@/slice';

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWatchlist());  
  }, [dispatch]);

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
