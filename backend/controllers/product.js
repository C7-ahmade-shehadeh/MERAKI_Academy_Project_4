const moduleProduct = require("../models/productSchema");
const modulecart = require("../models/cartSchema");


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
      modulecart.deleteMany({product:_id})
      .then((result) => { 
      res.status(200).json({ message: "delete product successfully" });
    }).catch((err) => {
      res.json({ err: err });
    });
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
// .find({$or :[{description:new RegExp('^'+ searchItem +'$')}] })
const search = (req, res) => {
  const {searchItem} = req.body;
  moduleProduct
    .find({description: new RegExp( searchItem)})
    .then((result) => {
      res.status(200).json({message: "Search Complete", post: result});
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
module.exports = { addproduct, Deleteproduct, getallproduct, updateproduct,search };

//{description:searchitem,$options:"([A-Z])\w+"},
//{name:{$regex :`${searchItem}`}},{manufacturingyear:{$regex :`${searchItem}`}},
