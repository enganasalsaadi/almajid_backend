import { Request, Response } from "../types/express";
import asyncHandler from "express-async-handler";
// import { User } from "../models/";
import generateToken from "../utils/generateToken";
import checkMatchPassword from "../utils/checkMatchPassword";
import bcrypt from "bcryptjs";
import { loginAction } from "../services/authService";
import ResponseType from "../types/response";
import { validateUser } from "../helpers/validateUser";
import { parseResponse, response } from "../helpers/parseResponse";
import {
  getAllProductsAction,
  addProductAction,
  saveFavoriteAction,
  editProductAction,
  removeProductAction,
} from "../services/productService";

/**
 * Get List Of Products
 * @route POST /api/products/all
 * @access Public
 */
const allProducts = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { search, order_by, order } = req.query as {
      search: string;
      order_by: string;
      order: string;
    };

    const products = await getAllProductsAction(search, order_by, order);

    response(res, parseResponse(200, "Successfully", products));
  } catch (error) {
    response(res, parseResponse(500, "Error", null));
  }
});

/**
 * Add Product
 * @route POST /api/products/add
 * @access Admin
 */
const addProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { title, description, price } = req.body as {
      title: string;
      description: string;
      price: string;
    };

    if(title && description && price)
    {

      const product = await addProductAction(
        title,
        description,
        parseFloat(price)
      );
      response(res, parseResponse(200, "Successfully", product));
    }else{

    response(res, parseResponse(403, "Fill All required fields", null));
    }
  } catch {
    response(res, parseResponse(500, "Error", null));
  }
});

const editProduct = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, price, product_id } = req.body as {
    title: string;
    description: string;
    price: string;
    product_id: number;
  };

  const product = await editProductAction(
    product_id,
    title,
    description,
    parseFloat(price)
  );
  try {
    response(res, parseResponse(200, "Successfully", product));
  } catch {
    response(res, parseResponse(500, "Error", null));
  }
});

const removeProduct = asyncHandler(async (req: Request, res: Response) => {
  const { product_id } = req.body as {
    product_id: number;
  };

  const product = await removeProductAction(product_id);
  try {
    response(res, parseResponse(200, "Successfully", product));
  } catch {
    response(res, parseResponse(500, "Error", null));
  }
});

const saveFavoritesProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const { ids } = req.body as {
      ids: number[];
    };
    const user_id = req.user?.user_id;

    try {
      if (user_id) {
        await saveFavoriteAction(user_id, ids);
      }
      response(res, parseResponse(200, "Successfully", []));
    } catch (error) {
      response(res, parseResponse(500, "Error", null));
    }
  }
);

export {
  allProducts,
  addProduct,
  saveFavoritesProducts,
  editProduct,
  removeProduct,
};
