const express = require("express");
const { role } = require("../controllers/role");

const roleRouter = express.Router();

roleRouter.post("/add", role);

module.exports = roleRouter;
