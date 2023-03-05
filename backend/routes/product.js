const express=require('express')
const{addproduct,Deleteproduct}=require('../controllers/product')

const productRouter=express.Router()

productRouter.post('/add',addproduct)
productRouter.delete('/delete/:id',Deleteproduct)

module.exports=productRouter;
