require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const flash = require("connect-flash");

const app = express();

const routes = require("./routes");
const { env } = require("./helpers/utils.helper");
const { handleError } = require("./helpers/error.helper");
const { AppConfig } = require("./config");

app.set("view engine", "ejs");
app.set("views", __dirname + "/resources/views");
 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static(path.join(__dirname, "/public")));
app.use(routes); 
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.locals = AppConfig.locals;

app.listen(AppConfig.port, () => {
  console.log(`Server running in ${env("APP_URL", "http://localhost")}:${env("APP_PORT", 3333)}`);
});