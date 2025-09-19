import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText } from 'lucide-react';
import { mockFinances } from '../mock/finances';

const Caja = () => {
  const [income, setIncome] = useState('');
  const [description, setDescription] = useState('');

  const handleAddIncome = () => {
    if (income > 0) {
      // Simular agregar ingreso
      alert(`Ingreso registrado: S/ ${income} - ${description}`);
      setIncome('');
      setDescription('');
    }
  };

  const handleArqueo = () => {
    alert(`Arqueo diario: Caja actual S/ ${mockFinances.currentCash}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Caja</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Registrar Ingreso</h2>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            placeholder="Monto del ingreso"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            placeholder="Descripción"
          />
          <motion.button
            onClick={handleAddIncome}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
            disabled={!income || !description}
          >
            <Plus className="inline w-5 h-5 mr-2" />
            Agregar Ingreso
          </motion.button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Arqueo Diario</h2>
          <p className="text-2xl font-bold text-green-600 mb-4">Caja Actual: S/ {mockFinances.currentCash}</p>
          <motion.button
            onClick={handleArqueo}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            <FileText className="inline w-5 h-5 mr-2" />
            Realizar Arqueo
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Caja;