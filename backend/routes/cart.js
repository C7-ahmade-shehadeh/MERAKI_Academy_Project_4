const express = require("express");
const {
  addcart,
  getcart,
  Deleteproductincart,
} = require("../controllers/cart");
const authorization = require("../middleware/authorization");

const authentication = require("../middleware/Authentication ");
const cartRouter = express.Router();

cartRouter.post("/add", authentication, authorization("ADD"), addcart);
cartRouter.get("/", authentication, getcart);
cartRouter.delete(
  "/delete/:id",
  authentication,
  Deleteproductincart
);

module.exports = cartRouter;


