import * as UsersService from "../services/user.service";
import jwt from "jsonwebtoken";

export const handleToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!req.cookies.refreshToken) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      user.toJSON(),
      process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
      { expiresIn: "1y" }
    );

    res.header("Authorization", `Bearer ${accessToken}`);
  });
};

export const logoutUser = async (req, res) => {
  req.session.userId = null;

  req.cookies.accessToken = null;
  req.cookies.refreshToken = null;

  res.json({ status: 204, message: "Logout successful" });
};

export const authUser = async (req, res) => {
  try {
    const user = await UsersService.findUserByEmailAndPassword({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      const accessToken = await jwt.sign(
        user.toJSON(),
        process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
        { expiresIn: "1y" }
      );

      const refreshToken = await jwt.sign(
        user.toJSON(),
        process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY
      );

      req.session.userId = user.id;
      req.session.save();

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: "production", // Configure para true se estiver usando HTTPS em produção
        sameSite: "Strict", // Ajuda a mitigar ataques CSRF
        expires: new Date(Date.now() + 31536000000), // 1y
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: "production", // Configure para true se estiver usando HTTPS em produção
        sameSite: "Strict", // Ajuda a mitigar ataques CSRF
      });

      res.set("Authorization", `Bearer ${accessToken}`);

      res.json({ status: 200, message: "Success to login" });

      return;
    }

    res.json({ status: 204, message: "Email or password incorrect" });
  } catch (error) {
    console.log("🚀 ~ authUser ~ error:", error);
    res.status(500).json({
      status: 500,
      error: "Error fetching a user from the database",
    });
  }
};

export const postUser = async (req, res) => {
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
};

export const getUser = async (req, res) => {
  try {
    const user = await UsersService.findUserByEmailAndPassword({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      res.json({ status: 200, data: user });
    }

    res.json({ status: 204, message: "User not found" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Error fetching a user from the database",
    });
  }
};
