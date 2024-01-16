import AppDataSource from "../database/dataSource";
import { Historic } from "../entities/historic.entities";

// TODO: pagination
export async function getHistoric(_, res) {
  try {
    const historic = await AppDataSource.manager.find(Historic);

    res.json({ status: 200, length: historic.length, historic });
  } catch (error) {
    if (error.message === 'No metadata for "Historic" was found.') {
      res.status(204).send({ status: 204, historic: [] });
    }

    console.error(error);

    res.status(500).json({
      status: 500,
      error: "Error fetching all historic from the database",
    });
  }
}

export async function deleteItem(req, res) {
  try {
    const historicRepository = AppDataSource.getRepository(Historic);
    const itemToDelete = await historicRepository.findOne({
      where: { id: req.params.id },
    });

    if (itemToDelete) {
      await historicRepository.remove(itemToDelete);

      res.json({ status: 200, message: "Sucesso ao deletar item" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ error: "Error fetching item don't found from the database" });

    console.error("Error deleting a historic from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error deleting a historic from the database",
    });
  }
}

export async function updateItem(req, res) {
  try {
    const historicRepository = AppDataSource.getRepository(Historic);
    const itemToUpdate = await historicRepository.findOne({
      where: { id: req.params.id },
    });

    if (itemToUpdate) {
      itemToUpdate.title = req.body.title;
      itemToUpdate.operation = req.body.operation;
      itemToUpdate.category = req.body.category;
      itemToUpdate.value_item = +req.body.value_item;
      itemToUpdate.date_input = req.body.date_input;

      await historicRepository.save(itemToUpdate);
    }

    res.json({ status: 200, message: "Sucesso ao atualizar item" });
  } catch (error) {
    if (error.message === 'No metadata for "Historic" was found.') {
      res.status(404).json({
        status: 404,
        error: "Error fetching item don't found from the database",
      });
    }

    console.error("Error updating a historic from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error updating a historic from the database",
    });
  }
}

export async function addItem(req, res) {
  try {
    const historic = new Historic();

    historic.title = req.body.title;
    historic.operation = req.body.operation;
    historic.category = req.body.category;
    historic.value_item = +req.body.value_item;
    historic.date_input = req.body.date_input;
    await AppDataSource.manager.save(historic);

    res.json({ status: 200, message: "Sucesso ao adicionar item" });
  } catch (error) {
    console.error("Error inserting a historic from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error inserting a historic from the database",
    });
  }
}

export async function getHistoricDetails(_, res) {
  try {
    const historic = AppDataSource.getRepository(Historic);

    const { totalEntrada, totalSaida } = await historic
      .createQueryBuilder()
      .select(
        "SUM(CASE WHEN operation = :entrada THEN value_item ELSE 0 END)",
        "totalEntrada"
      )
      .addSelect(
        "SUM(CASE WHEN operation = :saida THEN value_item ELSE 0 END)",
        "totalSaida"
      )
      .setParameters({ entrada: "entrada", saida: "saída" })
      .getRawOne();

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
    console.error("Error fetching historic details:", error);
    res.status(500).json({
      status: 500,
      error: "Error fetching historic details from the database",
    });
  }
}
