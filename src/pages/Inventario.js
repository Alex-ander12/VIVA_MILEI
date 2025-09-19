import React from 'react';
import { motion } from 'framer-motion';
import { Package, AlertCircle } from 'lucide-react';
import { mockProducts } from '../mock/products';

const Inventario = () => {
  const lowStockProducts = mockProducts.filter(p => p.lowStock || new Date(p.expiration) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventario</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Productos con Bajo Stock o Vencimiento</h2>
        {lowStockProducts.length === 0 ? (
          <p className="text-gray-500">Todo está en orden.</p>
        ) : (
          <ul className="space-y-2">
            {lowStockProducts.map((product) => (
              <motion.li
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between items-center p-3 bg-red-50 border-l-4 border-red-400"
              >
                <span>{product.name} - Stock: {product.stock}</span>
                <AlertCircle className="w-5 h-5 text-red-500" />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Vencimiento</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">S/ {product.price}</td>
                <td className="p-3">{new Date(product.expiration).toLocaleDateString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;