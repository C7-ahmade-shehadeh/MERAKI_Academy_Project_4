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
      console.log();
      res.status(200).json({ message: "delete product",result });
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
};
const updateproduct = (req, res) => {
  console.log('in updateproduct');
  const _id = req.params.id;
  const update = req.body;
  modulecart
    .findByIdAndUpdate(_id, update,{new:true})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(405).json(err);
    });
};
module.exports = { addcart, getcart,updateproduct, Deleteproductincart };
