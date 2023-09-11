import connection from "./database/dataSource";

const express = require("express");
const cors = require("cors");
const app = express();
const historicRoute = require("./routes/historicRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");
const CSS_URL =
  " https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css ";

connection;

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
