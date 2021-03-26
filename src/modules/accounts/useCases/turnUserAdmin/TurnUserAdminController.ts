import { Request, Response } from "express";
import { container } from "tsyringe";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const turnUserAdminUseCase = container.resolve(TurnUserAdminUseCase);

    await turnUserAdminUseCase.execute(userId);

    return response.status(204).send();
  }
}

export { TurnUserAdminController };
