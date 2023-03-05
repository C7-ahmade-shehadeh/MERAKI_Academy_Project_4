const mongoose=require('mongoose')

const cartSchema= new mongoose.Schema({
    product :{ type: mongoose.Schema.Types.ObjectId, ref: "product" },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
})


module.exports = mongoose.model("Cart", cartSchema);
