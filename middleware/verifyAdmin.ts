import { parseResponse, response } from "../helpers/parseResponse";
import { NextFunction, Request, Response } from "../types/express";

/**
 * Middleware used to protect routes from users who are not typed as admin
 */
const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.type === "admin") {
    next();
  } else {
    response(res, parseResponse(401, "Not authorized as an admin", null));
  }
};

export { admin };
