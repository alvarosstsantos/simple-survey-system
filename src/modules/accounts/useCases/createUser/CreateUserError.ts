import { AppError } from "@shared/errors/AppErrors";

class UserAlreadyExists extends AppError {
  constructor() {
    super("user already exists", 400);
  }
}

export default { UserAlreadyExists };
