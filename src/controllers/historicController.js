const historicModel = require("../models/historicModel");

async function getHistoric(_, res) {
  try {
    const historic = await historicModel.getAllHistoric();

    if (historic.length === 0) {
      res.status(204).send();
    } else {
      res.json(historic);
    }
  } catch (error) {
    console.error("Error fetching historic:", error);
    res
      .status(500)
      .json({ error: "Error fetching historic from the database" });
  }
}

module.exports = {
  getHistoric,
};
