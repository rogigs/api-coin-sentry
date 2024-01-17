import * as FinancesService from "../services/finances.service";

export const postFinance = async (req, res) => {
  try {
    const finance = await FinancesService.createFinance({
      newFinance: req.body,
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

// TODO: pagination
export const getFinances = async (_, res) => {
  try {
    const finances = await FinancesService.findFinances();

    res.json({ status: 200, length: finances.length, data: finances });
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

export const deleteFinance = async (req, res) => {
  try {
    const financeToDelete = await FinancesService.deleteFinanceById({
      id: req.params.id,
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

export const putFinanceById = async (req, res) => {
  try {
    const financeToUpdate = await FinancesService.updateFinanceById({
      id: req.params.id,
      newFinance: req.body,
    });
    console.log("🚀 ~ putFinanceById ~ financeToUpdate:", financeToUpdate);

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
    }

    console.error("Error updating a finances from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error updating a finances from the database",
    });
  }
};

export const getSumFinances = async (_, res) => {
  try {
    const { totalEntrada, totalSaida } = await FinancesService.sumFinances();

    if (!totalSaida) {
      res.json({
        status: 200,
        details: {
          entrada_total: +totalEntrada,
          saida_total: 0,
          total: +totalEntrada,
        },
      });
    } else if (!totalEntrada) {
      res.json({
        status: 200,
        details: {
          entrada_total: 0,
          saida_total: totalSaida,
          total: -+totalSaida,
        },
      });
    } else {
      res.json({
        status: 200,
        details: {
          entrada_total: +totalEntrada,
          saida_total: +totalSaida,
          total: +totalEntrada - +totalSaida,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching finances details:", error);

    res.status(500).json({
      status: 500,
      error: "Error fetching finances details from the database",
    });
  }
};