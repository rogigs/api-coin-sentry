import * as Sentry from "@sentry/node";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as UsersService from "../services/user.service";

export const handleToken = (req: Request, res: Response) => {
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

export const logoutUser = async (req: Request, res: Response) => {
  req.session.userId = null;

  req.session.save();

  req.cookies.accessToken = null;
  req.cookies.refreshToken = null;

  res.json({ status: 200, message: "Logout successful" });
};

// TODO: resolve types of cookies
export const authUser = async (req, res) => {
  try {
    const user = await UsersService.findUserByEmail({
      email: req.body.email,
    });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    const isNotAuthorized = !isMatch || !user;

    if (isNotAuthorized) {
      res.json({ status: 401, message: "Email or password incorrect" });
      return;
    }

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
      secure: "production",
      sameSite: "Strict",
      expires: new Date(Date.now() + 31536000000),
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: "production",
      sameSite: "Strict",
    });

    res.set("Authorization", `Bearer ${accessToken}`);

    res.json({ status: 200, message: "Success to login" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Error fetching a user from the database",
    });

    Sentry.captureException(error);
    Sentry.captureMessage(error.message);
  }
};

export const postUser = async (req: Request, res: Response) => {
  // TODO: validation email and anonymous email and password
  try {
    await UsersService.createUser({
      email: req.body.email,
      password: await bcrypt.hash(
        req.body.password,
        await bcrypt.genSaltSync(10)
      ),
    });

    res.json({ status: 200, message: "Sucesso ao criar usuário" });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Error inserting a user from the database",
    });

    Sentry.captureException(error);
    Sentry.captureMessage(error.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UsersService.findUserByEmail({
      email: req.body.email,
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

    Sentry.captureException(error);
    Sentry.captureMessage(error.message);
  }
};
