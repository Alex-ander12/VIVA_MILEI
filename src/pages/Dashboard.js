import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { mockFinances } from '../mock/finances';

const Dashboard = () => {
  const cards = [
    { title: 'Ventas Hoy', value: `S/ ${mockFinances.todaySales}`, icon: TrendingUp, color: 'bg-blue-500' },
    { title: 'Stock Bajo', value: mockFinances.lowStockCount, icon: AlertTriangle, color: 'bg-yellow-500' },
    { title: 'Caja Actual', value: `S/ ${mockFinances.currentCash}`, icon: DollarSign, color: 'bg-green-500' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-lg shadow-md ${card.color} text-white`}

            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-90">{card.title}</p>
                  <p className="text-2xl font-bold mt-2">{card.value}</p>
                </div>
                <Icon className="w-8 h-8 opacity-80" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;