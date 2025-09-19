// Simulación de API con datos locales y promesas
let productos = [
  { id: 1, name: 'Arroz Integral', stock: 50, price: 5.00, expiration: '2025-06-01' },
  { id: 2, name: 'Leche Deslactosada', stock: 10, price: 3.50, expiration: '2024-12-15' },
  { id: 3, name: 'Pan Integral', stock: 30, price: 2.00, expiration: '2024-12-10' },
  { id: 4, name: 'Aceite de Oliva', stock: 20, price: 15.00, expiration: '2025-03-20' },
  { id: 5, name: 'Yogur Natural', stock: 5, price: 4.00, expiration: '2024-12-05' }
];

let ventas = [
  { id: 1, productId: 1, quantity: 2, price: 5.00, customer: 'Juan Pérez', total: 10.00, date: new Date().toISOString().split('T')[0] },
  { id: 2, productId: 2, quantity: 1, price: 3.50, customer: 'María López', total: 3.50, date: new Date().toISOString().split('T')[0] },
  { id: 3, productId: 3, quantity: 5, price: 2.00, customer: 'Pedro García', total: 10.00, date: new Date().toISOString().split('T')[0] }
];

let caja = {
  ingresos: [
    { id: 1, amount: 100.00, description: 'Venta matutina', date: new Date().toISOString().split('T')[0] },
    { id: 2, amount: 50.00, description: 'Ingreso extra', date: new Date().toISOString().split('T')[0] }
  ],
  arqueos: [
    { id: 1, date: new Date().toISOString().split('T')[0], initial: 200.00, final: 350.00, difference: 150.00 }
  ],
  currentCash: 500.00
};

let proveedores = [
  { 
    id: 1, 
    name: 'Distribuidora ABC', 
    contact: 'abc@proveedor.com', 
    historial: [{ date: '2024-11-15', amount: 200.00, products: ['Arroz'] }],
    needsReplenish: false 
  },
  { 
    id: 2, 
    name: 'Supermercados XYZ', 
    contact: 'xyz@proveedor.com', 
    historial: [{ date: '2024-11-20', amount: 150.00, products: ['Leche'] }],
    needsReplenish: true 
  }
];

let pedidos = [];

// Simular delay de API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Obtener lista de productos
export const getProductos = () => {
  return new Promise((resolve) => {
    delay(500).then(() => {
      resolve([...productos]); // Copia para no mutar original
    });
  });
};

// Agregar una venta
export const addVenta = (venta) => {
  return new Promise((resolve) => {
    delay(300).then(() => {
      const newVenta = { ...venta, id: Date.now(), date: new Date().toISOString().split('T')[0] };
      ventas.push(newVenta);
      
      // Actualizar stock del producto
      const producto = productos.find(p => p.id === venta.productId);
      if (producto) {
        producto.stock -= venta.quantity;
      }
      
      // Actualizar caja
      caja.currentCash += newVenta.total;
      caja.ingresos.push({ id: Date.now(), amount: newVenta.total, description: `Venta a ${venta.customer}`, date: newVenta.date });
      
      resolve(newVenta);
    });
  });
};

// Obtener ventas
export const getVentas = () => {
  return new Promise((resolve) => {
    delay(400).then(() => {
      resolve([...ventas]);
    });
  });
};

// Obtener caja (ingresos y arqueos)
export const getCaja = () => {
  return new Promise((resolve) => {
    delay(300).then(() => {
      resolve({ ...caja });
    });
  });
};

// Obtener proveedores
export const getProveedores = () => {
  return new Promise((resolve) => {
    delay(500).then(() => {
      resolve([...proveedores]);
    });
  });
};

// Agregar pedido a proveedor
export const addPedido = (proveedorId, producto, cantidad) => {
  return new Promise((resolve) => {
    delay(400).then(() => {
      const newPedido = { 
        id: Date.now(), 
        proveedorId, 
        producto, 
        cantidad, 
        date: new Date().toISOString().split('T')[0],
        status: 'pendiente'
      };
      pedidos.push(newPedido);
      
      // Marcar proveedor como needsReplenish si no lo estaba
      const proveedor = proveedores.find(p => p.id === proveedorId);
      if (proveedor) {
        proveedor.needsReplenish = true;
        proveedor.historial.push({ date: newPedido.date, amount: 0, products: [producto] });
      }
      
      resolve(newPedido);
    });
  });
};