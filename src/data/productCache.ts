import { secureStorage, STORAGE_KEYS } from '@/utils/secureStorage';
import type { Product } from '@/screens/main/Home/home.types';

const PRODUCT_CACHE_KEY = STORAGE_KEYS.PRODUCTS_CACHE;
const CATEGORY_CACHE_KEY = STORAGE_KEYS.CATEGORIES_CACHE;

export const saveProductsCache = async (products: Product[]) => {
  try {
    await secureStorage.setObject(PRODUCT_CACHE_KEY, products);
  } catch (error) {
    console.log('Error saving products cache:', error);
  }
};

export const getProductsCache = async (): Promise<Product[] | null> => {
  try {
    return await secureStorage.getObject<Product[]>(PRODUCT_CACHE_KEY);
  } catch (error) {
    console.log('Error reading products cache:', error);
    return null;
  }
};

export const saveCategoriesCache = async (categories: any[]) => {
  try {
    await secureStorage.setObject(CATEGORY_CACHE_KEY, categories);
  } catch (error) {
    console.log('Error saving categories cache:', error);
  }
};

export const getCategoriesCache = async (): Promise<any[] | null> => {
  try {
    return await secureStorage.getObject<any[]>(CATEGORY_CACHE_KEY);
  } catch (error) {
    console.log('Error reading categories cache:', error);
    return null;
  }
};

export const clearProductCache = async () => {
  try {
    await secureStorage.removeItem(PRODUCT_CACHE_KEY);
    await secureStorage.removeItem(CATEGORY_CACHE_KEY);
  } catch (error) {
    console.log('Error clearing product cache:', error);
  }
};

export { PRODUCT_CACHE_KEY, CATEGORY_CACHE_KEY };
