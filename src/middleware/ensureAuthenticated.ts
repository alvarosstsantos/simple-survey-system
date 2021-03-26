import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
  isAdmin: boolean;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId, isAdmin } = verify(
      token,
      "39b514340ad3532aadc467e534e5fa37"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("user does nost exists");
    }

    request.user = {
      id: userId,
      isAdmin,
    };

    next();
  } catch {
    throw new AppError("invalid token");
  }
}
