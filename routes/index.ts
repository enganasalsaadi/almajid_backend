import express from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
const route = express.Router();

route.use("/users/", userRoutes);

route.use("/auth/", authRoutes);

route.use("/products/", productRoutes);

export default route