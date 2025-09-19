import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, UserPlus } from 'lucide-react';
import { mockProducts } from '../mock/products';
import { calculateDiscount } from '../utils/discounts';

const Ventas = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState('');
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const handleAddSale = () => {
    if (selectedProduct && quantity > 0 && customer) {
      const subtotal = selectedProduct.price * quantity;
      const disc = calculateDiscount(subtotal);
      setTotal(subtotal - disc);
      setDiscount(disc);
      // Simular guardar venta
      alert(`Venta registrada: ${quantity} x ${selectedProduct.name} para ${customer}. Total: S/ ${total.toFixed(2)} (Descuento: S/ ${disc.toFixed(2)})`);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setTotal(product.price * quantity);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Ventas</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Seleccionar Producto</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              onChange={(e) => handleProductSelect(mockProducts.find(p => p.id === parseInt(e.target.value)))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Buscar producto...</option>
              {mockProducts.map(p => <option key={p.id} value={p.id}>{p.name} - S/ {p.price}</option>)}
            </select>
          </div>
          {selectedProduct && (
            <div className="mb-4">
              <p className="font-semibold">Producto: {selectedProduct.name}</p>
              <p>Precio: S/ {selectedProduct.price}</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(parseInt(e.target.value));
                  setTotal(selectedProduct.price * parseInt(e.target.value));
                }}
                min="1"
                className="w-full p-2 border rounded mt-2"
                placeholder="Cantidad"
              />
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cliente y Total</h2>
          <div className="mb-4">
            <UserPlus className="inline w-5 h-5 mr-2" />
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nombre del cliente"
            />
          </div>
          <div className="space-y-2">
            <p>Total: S/ {total.toFixed(2)}</p>
            {discount > 0 && <p className="text-green-600">Descuento: S/ {discount.toFixed(2)}</p>}
            <p className="font-bold">A pagar: S/ {(total - discount).toFixed(2)}</p>
          </div>
          <motion.button
            onClick={handleAddSale}
            whileHover={{ scale: 1.05 }}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold"
            disabled={!selectedProduct || quantity <= 0 || !customer}
          >
            <Plus className="inline w-5 h-5 mr-2" />
            Registrar Venta
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Ventas;