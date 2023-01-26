import { Request, Response } from "../types/express";
import asyncHandler from "express-async-handler";
import { getAllUsers, setTimeSpent } from "../services/userService";
import { parseResponse, response } from "../helpers/parseResponse";

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    response(res, parseResponse(200, "Success add spent time", users));
  } catch (error) {
    response(res, parseResponse(500, "Error", null));
  }
});

const saveSpentTime = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.user_id;
    const { spentTime } = req.body as { spentTime: number };

    if (user_id) {
      await setTimeSpent(user_id, spentTime);
    }
    response(res, parseResponse(200, "Success add spent time", { spentTime }));
  } catch (error) {
    response(res, parseResponse(500, "Error", null));
  }
});
export { getUsers, saveSpentTime };
