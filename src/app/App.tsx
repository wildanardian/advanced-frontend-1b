import { RouterProvider } from 'react-router-dom';
import '../index.css';
import { AppProviders } from './providers';
import { router } from './router';
import { Provider } from 'react-redux';
import { useAppDispatch } from '../store/redux/hooks';
import { useEffect } from 'react';
import { getFilms, getSeries, getWatchlist } from '@/services/api/getData';
import { setFilms, setSeries, setWatchlist } from '../store/redux/dataReducer';
import { store } from '../store/redux/store';

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [films, series, watchlist] = await Promise.all([
          getFilms(),
          getSeries(),
          getWatchlist()
        ]);
        dispatch(setFilms(films));
        dispatch(setSeries(series));
        dispatch(setWatchlist(watchlist));
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
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
