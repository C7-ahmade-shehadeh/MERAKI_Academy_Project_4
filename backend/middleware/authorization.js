const authorization = (permissions) => {
  
  return (req, res, next) => {
    console.log(req.token);
    if (!req.token.role.permissions.includes(permissions)) {

      res.status(403).json({
        success: false,
        message: "not allowed",
      });
    }else{
    next();
  }
  };
};

module.exports=authorization