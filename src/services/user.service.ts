import AppDataSource from "../database/dataSource";
import { User } from "../entities/user.entities";

const userRepository = AppDataSource.getRepository(User);

export const findUserById = async ({ id }) => {
  return await userRepository.findOne({
    where: { id },
  });
};

export const findUserByEmailAndPassword = async ({ email, password }) => {
  return await userRepository.findOne({
    where: { email: email, password: password },
  });
};

export const createUser = async ({ newUser }) => {
  const user = new User();

  const { email, password } = newUser;

  user.email = email;
  user.password = password;

  await AppDataSource.manager.save(user);

  return await AppDataSource.manager.save(user);
};
