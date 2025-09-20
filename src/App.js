import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Ventas from './pages/Ventas';
import Inventario from './pages/Inventario';
import Caja from './pages/Caja';
import Proveedores from './pages/Proveedores';
import Reportes from './pages/Reportes';
import { getCurrentUser } from './utils/auth';
import './styles.css';

const App = () => {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);

    const interval = setInterval(() => {
      const currentUser = getCurrentUser();
      if (currentUser !== user) {
        setUser(currentUser);
      }
    }, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser !== user) {
      setUser(currentUser);
    }
  }, []);

  return (
    <Router>
      <div className="flex">
        {user && <Sidebar />}
        {/* En desktop Sidebar ocupa 64px (ml-64), en móvil Sidebar oculto (ml-0) */}
        <div className={user ? 'flex-1 ml-0 lg:ml-64' : 'w-full'}>
          {user && <Navbar />}
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
                    <Dashboard />
                  </motion.div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/ventas"
              element={
                <ProtectedRoute requiredRole="vendedor">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
                    <Ventas />
                  </motion.div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/inventario"
              element={
                <ProtectedRoute requiredRole="almacen">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
                    <Inventario />
                  </motion.div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/caja"
              element={
                <ProtectedRoute requiredRole="vendedor">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
                    <Caja />
                  </motion.div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/proveedores"
              element={
                <ProtectedRoute requiredRole="admin">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
                    <Proveedores />
                  </motion.div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/reportes"
              element={
                <ProtectedRoute requiredRole="admin">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
                    <Reportes />
                  </motion.div>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
