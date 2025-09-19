import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getVentas, getProductos, getCaja } from '../mockApi';
import { FileText, TrendingUp, PieChart } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Reportes = () => {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cajaData, setCajaData] = useState({ ingresos: [], currentCash: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ventasData, productosData, caja] = await Promise.all([
          getVentas(),
          getProductos(),
          getCaja()
        ]);
        setVentas(ventasData);
        setProductos(productosData);
        setCajaData(caja);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Procesar datos para gráfico de barras: ventas por día
  const ventasPorDia = ventas.reduce((acc, venta) => {
    acc[venta.date] = (acc[venta.date] || 0) + venta.total;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(ventasPorDia),
    datasets: [
      {
        label: 'Ventas por Día (S/)',
        data: Object.values(ventasPorDia),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Ventas Diarias' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Procesar datos para gráfico circular: distribución de stock por producto
  const totalStock = productos.reduce((sum, p) => sum + p.stock, 0);
  const pieData = productos.map((p) => ({
    name: p.name,
    stock: p.stock,
    percentage: totalStock > 0 ? (p.stock / totalStock * 100) : 0,
  })).filter(p => p.stock > 0); // Solo productos con stock

  const doughnutData = {
    labels: pieData.map(p => p.name),
    datasets: [
      {
        label: 'Distribución de Stock (%)',
        data: pieData.map(p => p.percentage),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Distribución de Inventario' },
    },
  };

  // Resumen de finanzas
  const totalIngresos = cajaData.ingresos.reduce((sum, i) => sum + i.amount, 0);
  const egresos = 0; // Simulado, puedes agregar lógica real
  const cajaFinal = cajaData.currentCash;

  const finanzas = [
    { label: 'Ingresos Totales', value: `S/ ${totalIngresos.toFixed(2)}`, icon: TrendingUp, color: 'bg-green-100 text-green-800' },
    { label: 'Egresos', value: `S/ ${egresos.toFixed(2)}`, icon: FileText, color: 'bg-red-100 text-red-800' },
    { label: 'Caja Final', value: `S/ ${cajaFinal.toFixed(2)}`, icon: PieChart, color: 'bg-blue-100 text-blue-800' },
  ];

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando reportes...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8"
      >
        Reportes
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de Barras */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Ventas por Día
          </h2>
          <Bar data={barData} options={barOptions} />
        </motion.div>

        {/* Gráfico Circular */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-purple-600" />
            Distribución de Stock
          </h2>
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <p className="text-center mt-4 text-sm text-gray-600">
            Total Stock: {totalStock} unidades
          </p>
        </motion.div>
      </div>

      {/* Tabla de Finanzas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center">
            <FileText className="w-5 h-5 mr-2 text-gray-600" />
            Resumen Financiero
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-700">Concepto</th>
                <th className="p-4 text-right font-semibold text-gray-700">Monto</th>
              </tr>
            </thead>
            <tbody>
              {finanzas.map((item, index) => (
                <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className={`p-4 ${item.color}`}>
                    <div className="flex items-center">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </div>
                  </td>
                  <td className="p-4 text-right font-semibold text-gray-900">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Ganancia Neta: S/ {(totalIngresos - egresos).toFixed(2)}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Reportes;