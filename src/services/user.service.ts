import AppDataSource from "../database/dataSource";
import { UserEntity } from "../entities/types/user.type.entity";
import { User } from "../entities/user.entities";

const userRepository = AppDataSource.getRepository(User);

export const findUserById = async ({ id }: Pick<UserEntity, "id">) => {
  return await userRepository.findOne({
    where: { id },
  });
};

export const findUserByEmailAndPassword = async ({
  email,
  password,
}: Omit<UserEntity, "id">) => {
  return await userRepository.findOne({
    where: { email: email, password: password },
  });
};

export const createUser = async ({
  email,
  password,
}: Omit<UserEntity, "id">) => {
  const user = new User();

  user.email = email;
  user.password = password;

  await AppDataSource.manager.save(user);

  return await AppDataSource.manager.save(user);
};
