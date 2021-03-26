import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";

export function ensureAdminPrivileges(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { isAdmin } = request.user;

  if (!isAdmin) {
    throw new AppError("user unauthorized", 401);
  }

  next();
}
