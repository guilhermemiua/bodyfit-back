const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const db = require("./configs");
const routes = require("./routes");
require("dotenv").config();

const app = express();

/*
fs.readFile("./src/database/migrations/script.sql", (err, sql) => {
  if (err) {
    console.log(err);
    console.log(sql);
  }
  db.query(sql.toString());
});
*/

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

// Server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
