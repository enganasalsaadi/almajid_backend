import { NextFunction, Request, Response } from "../types/express";
import jwt, { Secret } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { getUserByID } from "../services/userService";
import { parseResponse, response } from "../helpers/parseResponse";

interface Decoded {
  id: string;
  iat: Date;
  exp: Date;
}

/**
 * Middleware used to protect routes from unauthorized users
 */
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    const secret: Secret = process.env.JWT_SECRET!;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, secret) as unknown as Decoded;

        req.user = await getUserByID(parseInt(decoded.id));
        next();
      } catch (error) {
        response(res, parseResponse(401, "Not authorized, token failed", null));
      }
    }

    if (!token) {
      response(res, parseResponse(401, "Not authorized, no token", null));
    }
  }
);

export { protect };
