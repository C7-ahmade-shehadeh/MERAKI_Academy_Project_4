const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db =require ('./models/db')
const app = express();
const PORT = process.env.PORT || 5000;

const usersRouter=require('./routes/user')
const roleRouter =require('./routes/role')
const productRouter=require('./routes/product')
const cartRouter=require('./routes/cart')

app.use(cors());
app.use(express.json());

  app.use('/user',usersRouter)
app.use('/role',roleRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
