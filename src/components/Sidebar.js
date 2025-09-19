import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingCart, Package, DollarSign, Users, FileText, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout, getCurrentUser } from '../utils/auth';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const role = user?.role;

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'vendedor', 'almacen'] },
    { path: '/ventas', icon: ShoppingCart, label: 'Ventas', roles: ['admin', 'vendedor'] },
    { path: '/inventario', icon: Package, label: 'Inventario', roles: ['admin', 'almacen'] },
    { path: '/caja', icon: DollarSign, label: 'Caja', roles: ['admin', 'vendedor'] },
    { path: '/proveedores', icon: Users, label: 'Proveedores', roles: ['admin'] },
    { path: '/reportes', icon: FileText, label: 'Reportes', roles: ['admin'] }
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50"
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Raymi Gestión</h1>
        <p className="text-sm text-gray-600">{user?.username} ({role})</p>
      </div>
      <nav className="mt-8">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 p-4 text-left hover:bg-gray-100 ${
                location.pathname === item.path ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
              whileHover={{ x: 4 }}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </motion.button>
          );
        })}
      </nav>
      <motion.button
        onClick={handleLogout}
        className="absolute bottom-4 left-4 w-48 flex items-center gap-3 p-4 text-left text-red-600 hover:bg-red-50"
        whileHover={{ x: 4 }}
      >
        <LogOut className="w-5 h-5" />
        Salir
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;