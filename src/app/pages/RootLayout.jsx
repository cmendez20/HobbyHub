import { Navbar } from '../../components/Navbar';
import { Outlet } from 'react-router-dom';
import { SearchProvider } from '../SearchContext';

const RootLayout = () => {
  return (
    <SearchProvider>
      <Navbar />
      <div className="bg-gray-50 min-h-dvh">
        <Outlet />
      </div>
    </SearchProvider>
  );
};

export { RootLayout };
