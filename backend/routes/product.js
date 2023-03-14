const express = require("express");
const {
  addproduct,
  Deleteproduct,
  getallproduct,
  updateproduct,
  search,
  searchkind,
} = require("../controllers/product");
const authentication = require("../middleware/Authentication ");
const authorization = require("../middleware/authorization");
const productRouter = express.Router();

productRouter.post("/add", authentication, authorization("CREAT"), addproduct);
productRouter.put(
  "/updat/:id",
  authentication,
  authorization("CREAT"),
  updateproduct
);
productRouter.get("/", authentication, authentication, getallproduct);
productRouter.post("/search",search);
productRouter.get("/searchkind/",searchkind);
productRouter.delete(
  "/delete/:id",
  authentication,
  authorization("DELET"),
  Deleteproduct
);

module.exports = productRouter;
