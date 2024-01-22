import AppDataSource from "../database/dataSource";
import { Finances } from "../entities/finances.entities";
import { FinanceModel } from "../models/finances.model";
import { Pagination } from "../types";
import * as UsersService from "./user.service";

const financeRepository = AppDataSource.getRepository(Finances);

export const createFinance = async ({
  title,
  operation,
  category,
  value_item,
  date_input,
  user: { id },
}: Omit<FinanceModel, "id">) => {
  const finance = new Finances();

  const user = await UsersService.findUserById({ id });

  if (!user) {
    throw new Error("User not found");
  }

  finance.title = title;
  finance.operation = operation;
  finance.category = category;
  finance.value_item = +value_item;
  finance.date_input = date_input;

  finance.user = user;

  return await AppDataSource.manager.save(finance);
};

export const findFinances = async ({
  page,
  pageSize,
  user: { id },
}: Pagination & Pick<FinanceModel, "user">) => {
  const skip = page * pageSize;

  return await financeRepository.find({
    cache: true,
    take: pageSize,
    skip: skip,
    where: {
      user: { id },
    },
  });
};

export const countFinances = async ({
  user: { id },
}: Pick<FinanceModel, "user">) => {
  return await financeRepository.count({
    where: {
      user: { id },
    },
  });
};

export const deleteFinanceById = async ({
  id,
  user: { id: userId },
}: Pick<FinanceModel, "id" | "user">) => {
  const financeToDelete = await financeRepository.findOne({
    where: { id, user: { id: userId } },
  });

  return await financeRepository.remove(financeToDelete);
};

export const updateFinanceById = async ({
  id,
  title,
  operation,
  category,
  value_item,
  date_input,
  user: { id: userId },
}) => {
  const financeToUpdate = await financeRepository.findOne({
    where: { id, user: { id: userId } },
  });

  if (!financeToUpdate) {
    throw new Error('No metadata for "Finances" was found.');
  }

  financeToUpdate.title = title;
  financeToUpdate.operation = operation;
  financeToUpdate.category = category;
  financeToUpdate.value_item = +value_item;
  financeToUpdate.date_input = date_input;

  return await financeRepository.save(financeToUpdate);
};

export const sumFinances = async ({
  user: { id },
}: Pick<FinanceModel, "user">) => {
  return await financeRepository
    .createQueryBuilder()
    .select(
      "SUM(CASE WHEN operation = :entrada THEN value_item ELSE 0 END)",
      "input"
    )
    .addSelect(
      "SUM(CASE WHEN operation = :saida THEN value_item ELSE 0 END)",
      "output"
    )
    .where("user_id = :userId")
    .setParameters({
      entrada: "entrada",
      saida: "saida",
      userId: id,
    })
    .getRawOne();
};
