import express from "express";
import cors from "cors";
import historicRoute from "./routes/historic.routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css ";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use("/api", historicRoute);
app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { customCssUrl: CSS_URL })
);

app.listen(PORT, () => {
  console.log(`Server on ${PORT}...`);
});
