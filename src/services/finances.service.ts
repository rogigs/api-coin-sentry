import AppDataSource from "../database/dataSource";
import { Finances } from "../entities/finances.entities";

const historicRepository = AppDataSource.getRepository(Finances);

export const createFinance = async ({ newFinance }) => {
  const finance = new Finances();

  const { title, operation, category, value_item, date_input } = newFinance;

  finance.title = title;
  finance.operation = operation;
  finance.category = category;
  finance.value_item = +value_item;
  finance.date_input = date_input;

  return await AppDataSource.manager.save(finance);
};

export const findFinances = async () => {
  return await AppDataSource.manager.find(Finances);
};

export const deleteFinanceById = async ({ id }) => {
  const financeToDelete = await historicRepository.findOne({
    where: { id },
  });

  return await historicRepository.remove(financeToDelete);
};

export const updateFinanceById = async ({ id, newFinance }) => {
  const financeToUpdate = await historicRepository.findOne({
    where: { id },
  });

  const { title, operation, category, value_item, date_input } = newFinance;

  financeToUpdate.title = title;
  financeToUpdate.operation = operation;
  financeToUpdate.category = category;
  financeToUpdate.value_item = +value_item;
  financeToUpdate.date_input = date_input;

  return await historicRepository.save(financeToUpdate);
};

export const sumFinances = async () => {
  return await historicRepository
    .createQueryBuilder()
    .select(
      "SUM(CASE WHEN operation = :entrada THEN value_item ELSE 0 END)",
      "totalEntrada"
    )
    .addSelect(
      "SUM(CASE WHEN operation = :saida THEN value_item ELSE 0 END)",
      "totalSaida"
    )
    .setParameters({ entrada: "entrada", saida: "saida" })
    .getRawOne();
};
