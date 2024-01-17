import AppDataSource from "../database/dataSource";
import { Finances } from "../entities/finances.entities";
import * as UsersService from "./user.service";

const financeRepository = AppDataSource.getRepository(Finances);

export const createFinance = async ({ newFinance, userId }) => {
  const finance = new Finances();

  const user = await UsersService.findUserById({ id: userId });

  if (!user) {
    throw new Error("User not found");
  }

  const { title, operation, category, value_item, date_input } = newFinance;

  finance.title = title;
  finance.operation = operation;
  finance.category = category;
  finance.value_item = +value_item;
  finance.date_input = date_input;

  finance.user = user;

  return await AppDataSource.manager.save(finance);
};

export const findFinances = async ({ page, pageSize, userId }) => {
  const skip = page * pageSize;

  return await financeRepository.find({
    cache: true,
    take: pageSize,
    skip: skip,
    where: {
      user: { id: userId },
    },
  });
};

export const countFinances = async ({ userId }) => {
  return await financeRepository.count({
    where: {
      user: { id: userId },
    },
  });
};

export const deleteFinanceById = async ({ id, userId }) => {
  const financeToDelete = await financeRepository.findOne({
    where: { id, user: { id: userId } },
  });

  return await financeRepository.remove(financeToDelete);
};

export const updateFinanceById = async ({ id, newFinance, userId }) => {
  const financeToUpdate = await financeRepository.findOne({
    where: { id, user: { id: userId } },
  });

  const { title, operation, category, value_item, date_input } = newFinance;

  financeToUpdate.title = title;
  financeToUpdate.operation = operation;
  financeToUpdate.category = category;
  financeToUpdate.value_item = +value_item;
  financeToUpdate.date_input = date_input;

  return await financeRepository.save(financeToUpdate);
};

export const sumFinances = async ({ userId }) => {
  return await financeRepository
    .createQueryBuilder()
    .select(
      "SUM(CASE WHEN operation = :entrada THEN value_item ELSE 0 END)",
      "totalEntrada"
    )
    .addSelect(
      "SUM(CASE WHEN operation = :saida THEN value_item ELSE 0 END)",
      "totalSaida"
    )
    .where("user_id = :userId")
    .setParameters({ entrada: "entrada", saida: "saida", userId })
    .getRawOne();
};
