const modulecart = require("../models/cartSchema");

const addcart = (req, res) => {
  console.log("req.token: 4", req.token);
  const { product } = req.body;
  const userId = req.token.userId;
  modulecart.find({product:product,userId:userId})
  .then(result =>{
if (result.length > 0) {
  console.log('result10', result);

  res.status(403).json({
    message: "already add to cart ",
    result,
  });
}else{
  console.log('result17', result);
  const newcart = new modulecart({ product, userId });

  newcart
    .save()

    .then((result) => {
      console.log("result:12 ", result);
      res.status(200).json({
        message: "add to cart successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(403).json({ err: err });
    });}
  }).catch((err) => {
    res.status(406).json({ err: err,catch:'catch' });
  });
  
};
const getcart = (req, res) => {
  
  const userId = req.token.userId;

  modulecart
    .find({ userId: userId })
    .populate("product")
    .populate("userId")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(403).json({ err: err });
    });
};
const Deleteproductincart = (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  modulecart
    .findByIdAndDelete(_id)
    .then((result) => {
      res.status(200).json({ message: "delete product successfully" });
    })
    .catch((err) => {
      res.json({ err: err });
    });
};
module.exports = { addcart, getcart, Deleteproductincart };
