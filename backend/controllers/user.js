const usersSchema = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const register = (req, res) => {
  const { email, password, firstName, lastName, age, City, phoneNumber, role } =
    req.body;
  const newUser = new usersSchema({
    email,
    password,
    firstName,
    lastName,
    age,
    City,
    phoneNumber,
    role,
  });
  newUser
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err, 0);
      res.json(err.message);
    });
};
const login = (req, res) => {
  const { email, password } = req.body;
  usersSchema
    .findOne({ email })
    .populate("role")
    // .populate("Cart")
    .then(async (result) => {
     
        const SECRET=process.env.SECRET
        const TOKEN_EXP_TIME=process.env.TOKEN_EXP_Time
      if (!result) {
        res.status(403).json({
          success: false,
          message: `The *email doesn't exist or The password incorrect`,
        });
      }
      try {
        const iscompare = await bcrypt.compare(password, result.password);
        
        if (!iscompare) {
          console.log("iscompare ", iscompare);
          res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });}

          const payload = {
            
            firstName: result.firstName,
            userId: result._id,
            role:result.role,
          };
          const options={
            expiresIn:TOKEN_EXP_TIME
          }
          const token=jwt.sign(payload,SECRET,options)
        
          console.log("this.token",this.token);
          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            
            token
          });
        
      } catch (error) {
        res.status(403).json({
          success: false,
          error,
        });
        console.log("error", error);
      }
      // console.log("iscompare",iscompare);

      console.log("result.password", result.password);
      console.log("password", password);
    });
};

module.exports = { register, login };
