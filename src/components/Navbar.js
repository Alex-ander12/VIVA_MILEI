import React from 'react';
import { motion } from 'framer-motion';
import { Bell, User } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';

const Navbar = () => {
  const user = getCurrentUser();

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
    >
      {/* Sección izquierda */}
      <div className="flex items-center gap-2 sm:gap-4 justify-center sm:justify-start">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left truncate max-w-[200px] sm:max-w-none">
          Bienvenido, {user?.username}
        </h2>
      </div>

      {/* Sección derecha */}
      <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-end">
        <motion.button whileHover={{ scale: 1.1 }} className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </motion.button>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-xs sm:text-sm text-gray-600">{user?.role}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
