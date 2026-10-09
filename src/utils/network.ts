export const isNetworkAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=1');
    return response.ok;
  } catch (error) {
    return false;
  }
};
