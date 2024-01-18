import express from "express";
import cors from "cors";
import financesRoutes from "./routes/auth/finances.routes";
import userRoute from "./routes/user.routes";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";
import { validateBearerToken } from "./helpers/validateBearerToken";
import session from "express-session";
import cookieParser from "cookie-parser";

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

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use("/api", userRoute);
// TODO: put this in a one archive

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
