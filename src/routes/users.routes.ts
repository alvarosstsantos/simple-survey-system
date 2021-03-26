import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAdminPrivileges } from "../middleware/ensureAdminPrivileges";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { TurnUserAdminController } from "../modules/accounts/useCases/turnUserAdmin/TurnUserAdminController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const turnUserAdminController = new TurnUserAdminController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/:userId/admin",
  ensureAuthenticated,
  ensureAdminPrivileges,
  turnUserAdminController.handle
);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
