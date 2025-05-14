const logJwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader && authHeader.split(" ")[1];
    if(token){
      console.log("JWT Token: ", token);
      next();
    }
    else{
      console.log("No JWT Token found in the request h eaders.");
    }
  }
  next();
}

module.exports = logJwtMiddleware;