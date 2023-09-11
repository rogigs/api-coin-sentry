import { Historic } from "../entities/Historic";
import { AppDataSource } from "../database/dataSource";

export async function getHistoric(_, res) {
  AppDataSource.initialize()
    .then(async () => {
      const historic = await AppDataSource.manager.find(Historic);

      res.json({ status: 200, length: historic.length, historic });
    })
    .catch((error) => {
      if (error.message === 'No metadata for "Historic" was found.') {
        res.status(204).send({ status: 204, historic: [] });
      }

      console.error(error);

      res.status(500).json({
        status: 500,
        error: "Error fetching all historic from the database",
      });
    });
}

export async function deleteItem(req, res) {
  AppDataSource.initialize()
    .then(async () => {
      const historicRepository = await AppDataSource.getRepository(Historic);
      const itemToDelete = await historicRepository.findOne({
        where: { id: req.params.id },
      });

      if (itemToDelete) {
        await historicRepository.remove(itemToDelete);

        res.json({ status: 200, message: "Sucesso ao deletar item" });
      }
    })
    .catch((error) => {
      res
        .status(404)
        .json({ error: "Error fetching item don't found from the database" });

      console.error("Error deleting a historic from the database:", error);
      res.status(500).json({
        status: 500,
        error: "Error deleting a historic from the database",
      });
    });
}

export async function updateItem(req, res) {
  AppDataSource.initialize()
    .then(async () => {
      const historicRepository = await AppDataSource.getRepository(Historic);
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
    })
    .catch((error) => {
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
    });
}

export async function addItem(req, res) {
  AppDataSource.initialize()
    .then(async () => {
      const historic = new Historic();

      historic.title = req.body.title;
      historic.operation = req.body.operation;
      historic.category = req.body.category;
      historic.value_item = +req.body.value_item;
      historic.date_input = req.body.date_input;

      await AppDataSource.manager.save(historic);

      res.json({ status: 200, message: "Sucesso ao adicionar item" });
    })
    .catch((error) => {
      console.error("Error inserting a historic from the database:", error);
      res.status(500).json({
        status: 500,
        error: "Error inserting a historic from the database",
      });
    });
}

export async function getHistoricDetails(_, res) {
  // try {
  //   const details = await historicModel.getHistoricDetails();
  //   res.json({
  //     status: 200,
  //     details: {
  //       entrada_total: +details.entrada_total,
  //       saida_total: +details.saida_total,
  //       total: +details.total,
  //     },
  //   });
  // } catch (error) {
  //   console.error("Error fetching historic details:", error);
  //   res.status(500).json({
  //     status: 500,
  //     error: "Error fetching historic details from the database",
  //   });
  // }
}
