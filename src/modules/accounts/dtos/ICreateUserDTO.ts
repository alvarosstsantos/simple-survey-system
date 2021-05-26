import { User } from "../infra/typeorm/entities/User";

type ICreateUserDTO = Pick<
  User,
  "id" | "name" | "email" | "password" | "avatar"
>;

export { ICreateUserDTO };
