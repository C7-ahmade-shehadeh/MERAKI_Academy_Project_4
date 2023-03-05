const mongoose =require("mongoose")
mongoose.set("strictQuery", false);

mongoose 
.connect( process.env.DB_concection)
.then(()=>{
    console.log('DB Ready To Use');
})
.catch((err)=>{
    console.log(err);
})