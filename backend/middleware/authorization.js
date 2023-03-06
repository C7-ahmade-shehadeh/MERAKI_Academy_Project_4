const authorization = (permissions) => {
  return (req, res, next) => {
    if (!req.token.role.permissions.includes(permissions)) {
      res.status(403).json({
        success: false,
        message: "not allowed",
      });
    }
    next();
  };
};

module.exports=authorization