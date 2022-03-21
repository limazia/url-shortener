const express = require("express");

const routes = express.Router();

const ShortenerController = require("./app/controllers/ShortenerController");

routes.get("/", ShortenerController.renderFormShortener);
routes.get("/:code", ShortenerController.renderPageCode);
routes.get("/:code/stats", ShortenerController.renderPageCodeStats);
routes.post("/new", ShortenerController.formShortener);

module.exports = routes;