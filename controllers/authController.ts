import { Request, Response } from "../types/express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";
import checkMatchPassword from "../utils/checkMatchPassword";
import { loginAction } from "../services/authService";
import { validateUser } from "../helpers/validateUser";
import { parseResponse, response } from "../helpers/parseResponse";

/**
 * Authenticate user/admin and get token
 * @route POST /api/auth/login
 * @access Public
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, type } = req.body as {
    email: string;
    password: string;
    type: string;
  };
  
  if (!validateUser(email, password)) {
    response(res, parseResponse(403, "Invalid login", null));
  }

  const user = await loginAction(email, type);

  if (user && (await checkMatchPassword(password, user.password))) {
    response(
      res,
      parseResponse(200, "wrong email or password", {
        fullname: user.fullname,
        email: user.email,
        token: generateToken(user.user_id),
      })
    );
  } else {
    response(res, parseResponse(403, "wrong email or password", null));
  }
});


export { authUser };
