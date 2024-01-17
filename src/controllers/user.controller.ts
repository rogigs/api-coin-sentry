import AppDataSource from "../database/dataSource";
import connection from "../database/dataSource";
import { User } from "../entities/user.entities";

// TODO: pagination
export async function getUser(req, res) {
  try {
    const userRepository = connection.getRepository(User);

    const user = await userRepository.findOne({
      where: { email: req.query.email, password: req.query.password },
    });

    if (user) {
      res.json({ status: 200, message: "Success to login" });

      return;
    }

    res.json({ status: 204, message: "User not found" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Error fetching all historic from the database",
    });
  }
}

export async function createUser(req, res) {
  // TODO: validation email and anonymous email and password

  try {
    const user = new User();

    const { email, password } = req.body;

    user.email = email;
    user.password = password;

    await AppDataSource.manager.save(user);

    res.json({ status: 200, message: "Sucesso ao criar usuário" });
  } catch (error) {
    console.error("Error inserting a user from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error inserting a user from the database",
    });
  }
}
