const modulecart = require("../models/cartSchema");

const addcart = (req, res) => {
    console.log("req.token: 4",req.token);  
  const { product } = req.body;
  const userId  = req.token.userId;
  const newcart = new modulecart({ product,userId });
  newcart
    .save()

    .then((result) => {
      console.log("result:12 ",result);
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
  const userId  = req.token.userId;
console.log(userId);
    
  modulecart
    .find({userId:userId})
    .populate("product")
    .populate("userId")
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
