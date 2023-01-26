import express from "express";
import { authUser } from "./../controllers/authController";
const router = express.Router();

router.route("/login").post(authUser);

export default router;
