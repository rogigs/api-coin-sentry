import { Request, Response } from "express";
import * as FinancesService from "../services/finances.service";

export const getSumFinances = async (req: Request, res: Response) => {
  console.log("🚀 ~ getSumFinances ~ req.session.userId:", req.session);

  try {
    const { sumInput, sumOutput } = await FinancesService.sumFinances({
      user: {
        id: req.session.userId,
      },
    });

    const numberSumInput = Number(sumInput);
    const numberSumOutput = Number(sumOutput);

    console.log("🚀 ~ getSumFinances ~ numberSumOutput:", {
      entrada_total: numberSumInput,
      saida_total: numberSumOutput,
      total: numberSumOutput - numberSumInput,
    });

    res.json({
      status: 200,
      data: {
        entrada_total: numberSumInput,
        saida_total: numberSumOutput,
        total: numberSumOutput - numberSumInput,
      },
    });
  } catch (error) {
    console.error("Error fetching finances details:", error);

    res.status(500).json({
      status: 500,
      error: "Error fetching finances details from the database",
    });
  }
};

export const postFinance = async (req: Request, res: Response) => {
  try {
    const { title, operation, category, value_item, date_input } = req.body;

    const finance = await FinancesService.createFinance({
      title,
      operation,
      category,
      value_item,
      date_input,
      user: {
        id: req.session.userId,
      },
    });

    res.json({ status: 200, data: finance });
  } catch (error) {
    console.error("Error inserting a finance from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error inserting a finance from the database",
    });
  }
};

export const getFinances = async (req: Request, res: Response) => {
  try {
    console.log("🚀 ~ getFinances ~  req.session:", req.session);

    const page = parseInt(req.query.page as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const userId = req.session.userId;

    const finances = await FinancesService.findFinances({
      page,
      pageSize,
      user: {
        id: userId,
      },
    });
    const lengthFinances = await FinancesService.countFinances({
      user: { id: userId },
    });

    res.json({ status: 200, length: lengthFinances, data: finances });
  } catch (error) {
    console.error(error);

    if (error.message === 'No metadata for "Finances" was found.') {
      res.status(204).send({ status: 204, length: 0, data: [] });
    }

    res.status(500).json({
      status: 500,
      error: "Error fetching all finances from the database",
    });
  }
};

export const deleteFinance = async (req: Request, res: Response) => {
  try {
    const financeToDelete = await FinancesService.deleteFinanceById({
      id: req.params.id,
      user: {
        id: req.session.userId,
      },
    });

    if (financeToDelete) {
      res.json({
        status: 200,
        message: "Sucesso ao deletar item",
        data: financeToDelete,
      });
    }
  } catch (error) {
    console.error("Error deleting a finance from the database:", error);

    res.status(500).json({
      status: 500,
      error: "Error deleting a finance from the database",
    });
  }
};

export const putFinanceById = async (req: Request, res: Response) => {
  try {
    const financeToUpdate = await FinancesService.updateFinanceById({
      id: req.params.id,
      user: {
        id: req.session.userId,
      },
      ...req.body,
    });

    res.json({
      status: 200,
      message: "Sucesso ao atualizar item",
      data: financeToUpdate,
    });
  } catch (error) {
    if (error.message === 'No metadata for "Finances" was found.') {
      res.status(404).json({
        status: 404,
        error: "Error fetching item don't found from the database",
      });

      return;
    }

    console.error("Error updating a finances from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error updating a finances from the database",
    });
  }
};
