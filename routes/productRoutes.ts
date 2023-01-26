import express from "express";
import {
  allProducts,
  addProduct,
  saveFavoritesProducts,
  editProduct,
  removeProduct,
} from "../controllers/productController";
import { protect } from "../middleware/authMiddleware";
import { admin } from "../middleware/verifyAdmin";
const router = express.Router();

router.route("/all").get(allProducts);
router.route("/add").post(protect, admin, addProduct);
router.route("/edit").post(protect, admin, editProduct);
router.route("/remove").post(protect, admin, removeProduct);

router.route("/saveFavorites").post(protect, saveFavoritesProducts);

export default router;
