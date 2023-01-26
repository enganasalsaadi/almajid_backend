import {
  addProduct,
  editProduct,
  getAllProducts,
  removeProduct,
  saveFavoriteDb,
} from "../db/productDb";
const getAllProductsAction = async (
  search: string,
  order_by: string,
  order: string
) => {
  return await getAllProducts(search, order_by, order);
};

const addProductAction = async (
  title: string,
  description: string,
  price: number
) => {
  return await addProduct(title, description, price);
};

const editProductAction = async (
  product_id: number,
  title: string,
  description: string,
  price: number
) => {
  return await editProduct(product_id, title, description, price);
};

const removeProductAction = async (product_id: number) => {
  return await removeProduct(product_id);
};

const saveFavoriteAction = async (user_id: number, ids: number[]) => {
  return await saveFavoriteDb(user_id, ids);
};
export {
  getAllProductsAction,
  addProductAction,
  saveFavoriteAction,
  editProductAction,
  removeProductAction,
};
