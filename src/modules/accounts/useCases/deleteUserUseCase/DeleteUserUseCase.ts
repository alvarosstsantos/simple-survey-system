import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class DeleteUserUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    userId: string,
    requestingUserId: string,
    isAdmin: boolean
  ): Promise<void> {
    if (userId !== requestingUserId && !isAdmin) {
      throw new AppError("user unalthorized", 401);
    }

    await this.usersRepository.delete(userId);
  }
}

export { DeleteUserUserCase };
