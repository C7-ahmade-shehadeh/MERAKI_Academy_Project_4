const express=require('express')
const{addcart,getcart,Deleteproductincart}=require('../controllers/cart')
const authentication=require('../middleware/Authentication ')
const cartRouter=express.Router()

cartRouter.post('/add',authentication,addcart)
cartRouter.get('/',getcart)
cartRouter.delete('/delete/:id',Deleteproductincart)


module.exports=cartRouter;
