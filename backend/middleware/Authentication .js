const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(403).json("Forbidden");
    }
    const token = req.headers.authorization.split(" ").pop();
    jwt.verify(token, process.env.SECRET, (err, valid) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: `The token is invalid or expired`,
        });
      } else {
        req.token = valid;
        next();
      }
    });
  } catch (error) {
    res.status(403).json({
      message: `error`,
      err: error.message,
    });
  }
};

module.exports = authentication;
