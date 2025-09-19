import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, UserPlus, Truck } from 'lucide-react';
import { mockProviders } from '../mock/providers';

const Proveedores = () => {
  const [newProvider, setNewProvider] = useState({ name: '', contact: '' });

  const handleAddProvider = () => {
    if (newProvider.name && newProvider.contact) {
      // Simular agregar proveedor
      alert(`Proveedor agregado: ${newProvider.name} - ${newProvider.contact}`);
      setNewProvider({ name: '', contact: '' });
    }
  };

  const handleReplenish = (id) => {
    alert(`Pedido de reposición enviado al proveedor ID ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Proveedores</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Registrar Nuevo Proveedor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newProvider.name}
            onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
            className="p-3 border rounded-lg"
            placeholder="Nombre del proveedor"
          />
          <input
            type="email"
            value={newProvider.contact}
            onChange={(e) => setNewProvider({ ...newProvider, contact: e.target.value })}
            className="p-3 border rounded-lg"
            placeholder="Contacto (email)"
          />
        </div>
        <motion.button
          onClick={handleAddProvider}
          whileHover={{ scale: 1.05 }}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold"
        >
          <Plus className="inline w-5 h-5 mr-2" />
          Agregar Proveedor
        </motion.button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Proveedor</th>
              <th className="p-3 text-left">Contacto</th>
              <th className="p-3 text-left">Última Compra</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockProviders.map((provider) => (
              <motion.tr
                key={provider.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">{provider.name}</td>
                <td className="p-3">{provider.contact}</td>
                <td className="p-3">{provider.purchases[0]?.date || 'Ninguna'}</td>
                <td className="p-3">
                  {provider.needsReplenish && (
                    <motion.button
                      onClick={() => handleReplenish(provider.id)}
                      whileHover={{ scale: 1.05 }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm mr-2"
                    >
                      <Truck className="inline w-4 h-4 mr-1" />
                      Reponer
                    </motion.button>
                  )}
                  <button className="text-blue-600 hover:underline">Ver Historial</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proveedores;