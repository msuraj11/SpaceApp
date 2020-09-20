const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploader");

const routes = app => {
  router.post("/api/upload", uploadController.uploadFiles);

  return app.use("/", router);
};

module.exports = routes;