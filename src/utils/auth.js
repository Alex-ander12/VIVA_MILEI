import { users } from '../mock/users';

export const login = (username, password) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const hasAccess = (role, requiredRole) => {
  const accessMap = {
    admin: ['admin', 'vendedor', 'almacen'],
    vendedor: ['vendedor'],
    almacen: ['almacen']
  };
  return accessMap[role]?.includes(requiredRole) || false;
};