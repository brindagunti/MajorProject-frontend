import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useMemo } from 'react';
import './App.css'; // make sure global styles are here

function Layout() {
  const location = useLocation();

  // Pages where Navbar/Footer should be hidden
  const hideLayout = useMemo(() => {
    return location.pathname === "/login" || location.pathname === "/signup";
  }, [location.pathname]);

  return (
    <div className="app-container">
      {!hideLayout && <Navbar />}
      <main className="main-content">
        <AppRoutes />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
