import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validateBearerToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default validateBearerToken;
