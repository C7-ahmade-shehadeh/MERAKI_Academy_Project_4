const modulecart = require("../models/cartSchema");

const addcart = (req, res) => {
    console.log(req.token);  
  const { product, user } = req.body;
  const newcart = new modulecart({ product, user });
  newcart
    .save()

    .then((result) => {
      res.status(200).json({
        message: "add to cart successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(403).json({ err: err });
    });
};
const getcart = (req, res) => {
// const _id =req.params.id
    
  modulecart
    .find()
    .populate("product")
    .populate("user")
    .then((result) => {
      res.status(200).json({
       
        result,
      });
    })
    .catch((err) => {
      res.status(403).json({ err: err });
    });
};
const Deleteproductincart=(req,res)=>{
    const _id =req.params.id
    console.log(_id);
    modulecart
    .findByIdAndDelete(_id)
    .then(result=>{
        res.status(200).json(
            {message:"delete product successfully"})
    
    })
    .catch(err=>{
        res.json({'err':err})
    
    })
    }
module.exports = { addcart,getcart,Deleteproductincart };
