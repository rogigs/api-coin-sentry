const express = require("express");
const cors = require("cors");
const app = express();
const historicRoute = require("./routes/historicRoute");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use("/api", historicRoute);

app.listen(PORT, () => {
  console.log(`Server on ${PORT}...`);
});
