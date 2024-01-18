import cors from "cors";
import express from "express";
import financesRoutes from "./routes/auth/finances.routes";
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
    secret: "segredo",
    resave: true,
    saveUninitialized: true,
  })
);
declare module "express-session" {
  export interface SessionData {
    userId: string | null;
  }
}

// TODO: set corrects CORS
app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["Authorization"],
  })
);

const PORT = process.env.PORT || 4000;

// TODO: put this in a one archive
app.use("/api", userRoute);

app.use("*", validateBearerToken);
app.use("/api", financesRoutes);

app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { customCssUrl: CSS_URL })
);

app.listen(PORT, () => {
  console.log(`Server on ${PORT}...`);
});
