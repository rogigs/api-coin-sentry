import * as UsersService from "../services/user.service";

export async function getUser(req, res) {
  try {
    const user = await UsersService.findUserByEmailAndPassword({
      email: req.query.email,
      password: req.query.password,
    });

    if (user) {
      res.json({ status: 200, message: "Success to login" });

      req.session.userId = user.id;

      req.session.save();

      return;
    }

    res.json({ status: 204, message: "User not found" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Error fetching a user from the database",
    });
  }
}

export async function postUser(req, res) {
  // TODO: validation email and anonymous email and password

  try {
    await UsersService.createUser({
      newUser: req.body,
    });

    res.json({ status: 200, message: "Sucesso ao criar usuário" });
  } catch (error) {
    console.error("Error inserting a user from the database:", error);
    res.status(500).json({
      status: 500,
      error: "Error inserting a user from the database",
    });
  }
}
