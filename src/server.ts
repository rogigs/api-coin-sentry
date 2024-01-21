import cors from "cors";
import express from "express";
import financesRoutes from "./routes/auth/finances.routes";
import userAuthRoutes from "./routes/auth/user.routes";

import userRoute from "./routes/user.routes";

import cookieParser from "cookie-parser";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";
import { validateBearerToken } from "./helpers/validateBearerToken";

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css ";

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);
declare module "express-session" {
  export interface SessionData {
    userId: string | null;
  }
}

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Authorization"],
    allowedHeaders: "Content-Type,Authorization,access-control-allow-headers",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

const PORT = process.env.PORT || 4000;

// TODO: put this in a one archive
app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { customCssUrl: CSS_URL })
);
app.use("/api", userRoute);

app.use("*", validateBearerToken);

app.use("/api", financesRoutes);
app.use("/api", userAuthRoutes);

app.listen(PORT, () => {
  console.log(`Server on ${PORT}...`);
});
