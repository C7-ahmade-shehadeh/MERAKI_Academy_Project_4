const usersSchema = require("../models/usersSchema");
const bcrypt = require("bcrypt");

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
    .then(async( result) => {
        try {
            const iscompare=await bcrypt.compare(result.password, password)
         if (iscompare) {
          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            // token: token,
          });
        } else {
          res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          
            
          });
        }
     
        } catch (error) {
            res.status(403).json({
                success: false,
                "error":error
            });
            console.log("error",error);
        }
      
      console.log("result.password", result.password);
      console.log("password", password);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports = { register, login };
