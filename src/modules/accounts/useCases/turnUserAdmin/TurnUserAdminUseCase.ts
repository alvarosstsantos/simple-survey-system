import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class TurnUserAdminUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    user.isAdmin = true;

    await this.usersRepository.create(user);
  }
}

export { TurnUserAdminUseCase };
