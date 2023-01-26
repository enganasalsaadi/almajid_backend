import pool from "../config/connection";

const getAllProducts = async (
  search: string,
  order_by: string,
  order: string
) => {
  let order_by_ = order_by ? order_by : "products.created_at";
  let order_ = order ? order : "DESC";
  let search_ = search ? search : "";

  const { rows: product } = await pool.query(
    `select * from products where title LIKE '%'||lower($1)||'%' ORDER BY ${order_by_} ${order_} `,
    [search_]
  );
  return product;
};


const addProduct = async (
  title: string,
  description: string,
  price: number
) => {
  await pool.query(
    'insert into public."products" (title, description,price) values ($1, $2,$3)',
    [title, description, price]
  );

  return true;
};

const editProduct = async (
  product_id: number,
  title: string,
  description: string,
  price: number
) => {
  await pool.query(
    "update products set price = $2 , title=$3 , description=$4  where products.product_id = $1",
    [product_id, price, title, description]
  );

  return true;
};

const removeProduct = async (product_id: number) => {
  await pool.query("delete from products where product_id = $1", [product_id]);

  return true;
};

const saveFavoriteDb = async (user_id: number, ids: number[]) => {
  await pool.query("delete from favorites_products where user_id = $1", [
    user_id,
  ]);

  await pool.query(
    'insert into public."favorites_products" (user_id, favorites_ids) values ($1, $2)',
    [user_id, ids]
  );

  return true;
};

export {
  getAllProducts,
  addProduct,
  saveFavoriteDb,
  editProduct,
  removeProduct,
};
