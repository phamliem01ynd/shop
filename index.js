const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;
const cors = require("cors");
const router = require("./src/router/api");
app.use(cors());

app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api", router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
