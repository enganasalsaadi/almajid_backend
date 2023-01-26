import { Request as Req, Response as Res, NextFunction as Next } from "express";
import User from "./user";
/**
 * Combine Express types with customer User interface
 */
export type Request = Req & User;
export type Response = Res & User;
export type NextFunction = Next;
