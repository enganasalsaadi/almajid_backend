import express from "express";
import { getUsers, saveSpentTime } from "./../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import { admin } from "./../middleware/verifyAdmin";
const router = express.Router();

router.route("/all").get(protect, admin, getUsers);

router.route("/saveSpentTime").post(protect, saveSpentTime);

export default router;
