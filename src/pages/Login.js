import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const user = login(username, password);
    if (user) {
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <LogIn className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h1>
          <p className="text-gray-500 mt-2">Accede a Raymi Gestión</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm bg-red-50 p-3 rounded-lg"
            >
              {error}
            </motion.p>
          )}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            disabled={!username || !password}
          >
            <LogIn className="w-5 h-5" />
            Ingresar
          </motion.button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-4">
          Usuarios de prueba: admin / vendedor / almacen | Contraseña: 1234
        </p>
      </motion.div>
    </div>
  );
};

export default Login;