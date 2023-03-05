const moduleProduct=require('../models/productSchema')

const addproduct=(req,res)=>{
const {kind,
    name,
    price,
    delivery,
    state,
    manufacturingyear,
    description}=req.body
    const newproduct=new moduleProduct(
        {kind,
    name,
    price,
    delivery,
    state,
    manufacturingyear,
    description}) 
    newproduct
    .save()
        .then(result=>{
res.status(200).json({message:"add to product successfully"
,result})
        })
    .catch(err =>{
res.status(403).json(err)

    })
}
const Deleteproduct=(req,res)=>{
const _id =req.params.id
console.log(_id);
moduleProduct
.findByIdAndDelete(_id)
.then(result=>{
    res.status(200).json(
        {message:"delete product successfully"})

})
.catch(err=>{
    res.json({'err':err})

})
}

module.exports={addproduct,Deleteproduct}