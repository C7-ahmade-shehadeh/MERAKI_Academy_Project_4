const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    kind : {required:true, type :String},

name : {required:true, type :String},

price : {required:true, type :String},

delivery : {required:true, type :String},

state : {required:true, type :String},

manufacturingyear : { type :String},

description : { type :String},
amount : { type :Number,default: 1},

img:{ type :String}
})

module.exports=mongoose.model('product',productSchema)
