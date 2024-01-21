import AppDataSource from "../database/dataSource";
import { User } from "../entities/user.entities";
import { UserModel } from "../models/user.model";

const userRepository = AppDataSource.getRepository(User);

//
export const findUserById = async ({ id }: Pick<UserModel, "id">) => {
  return await userRepository.findOne({
    where: { id },
  });
};

export const findUserByEmailAndPassword = async ({
  email,
  password,
}: Omit<UserModel, "id">) => {
  return await userRepository.findOne({
    where: { email: email, password: password },
  });
};

export const createUser = async ({
  email,
  password,
}: Omit<UserModel, "id">) => {
  const user = new User();

  user.email = email;
  user.password = password;

  await AppDataSource.manager.save(user);

  return await AppDataSource.manager.save(user);
};
