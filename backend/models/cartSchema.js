const mongoose=require('mongoose')

const cartSchema= new mongoose.Schema({
    product :{ type: mongoose.Schema.Types.ObjectId, ref: "product" },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount : { type :Number,default: 1},
})



module.exports = mongoose.model("Cart", cartSchema);
