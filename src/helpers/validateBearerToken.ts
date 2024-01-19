import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const validateBearerToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const justToken = token.split(" ")[1];
    const decoded = jwt.verify(
      justToken,
      process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default validateBearerToken;
