const moduleProduct = require("../models/productSchema");

const addproduct = (req, res) => {
  const { kind, name, price, 
    delivery, state, manufacturingyear,
     description,img } =
    req.body;
  const newproduct = new moduleProduct({
    kind,
    name,
    price,
    delivery,
    state,
    manufacturingyear,
    description,img
  });
  newproduct
    .save()
    .then((result) => {
      res.status(200).json({ message: "add to product successfully", result });
    })
    .catch((err) => {
      res.status(403).json(err);
    });
};
const Deleteproduct = (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  moduleProduct
    .findByIdAndDelete(_id)
    .then((result) => {
      res.status(200).json({ message: "delete product successfully" });
    })
    .catch((err) => {
      res.json({ err: err });
    });
};
const getallproduct = (req, res) => {
  const userId = req.token.userId;

  moduleProduct
    .find()
    .then((result) => {
      res.status(200).json({
        result,
        userId:userId
      });
    })
    .catch((err) => {
      res.status(403).json({ err: err });
    });
};
const updateproduct = (req, res) => {
  const _id = req.params.id;
  const update = req.body;
  moduleProduct
    .findByIdAndUpdate(_id, update,{new:true})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports = { addproduct, Deleteproduct, getallproduct, updateproduct };
