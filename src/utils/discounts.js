export const calculateDiscount = (total) => {
  if (total > 100) return total * 0.15;
  if (total > 50) return total * 0.10;
  return 0;
};