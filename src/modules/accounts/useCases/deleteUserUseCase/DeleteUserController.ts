import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserUserCase } from "./DeleteUserUseCase";

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: requestingUserId, isAdmin } = request.user;
    const { userId } = request.params;

    const deleteUserUseCase = container.resolve(DeleteUserUserCase);

    await deleteUserUseCase.execute(userId, requestingUserId, isAdmin);

    return response.status(204).send();
  }
}

export { DeleteUserController };
