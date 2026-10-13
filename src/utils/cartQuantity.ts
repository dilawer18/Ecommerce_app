export const getMinimumCartQuantity = (minimumOrderQuantity?: number): number => {
  if (typeof minimumOrderQuantity === 'number' && Number.isFinite(minimumOrderQuantity) && minimumOrderQuantity > 1) {
    return minimumOrderQuantity;
  }

  return 0;
};

export const isCartQuantityMinReached = (quantity: number, minimumOrderQuantity?: number): boolean => {
  return quantity <= getMinimumCartQuantity(minimumOrderQuantity);
};
