//jwt token checking
const jwt = require("jsonwebtoken");
// middleware to verify token via headers
//for logging out you can use jwt redis
/* var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);

jwtr.sign(payload, secret)
    .then((token)=>{
            // your code
    })
    .catch((error)=>{
            // error handling
    });
3) To verify -

jwtr.verify(token, secret);
4) To Destroy -

jwtr.destroy(token) */

function authenticateMiddleware(req, res, next) {
  const token = req.headers?.authorization?.split("")[1];
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Login again , Invalid Token",
      loggedout: true,
    });
  }
  try {
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    console.log(decodedValue);
    if (decodedValue.username) {
      req.username = decodedValue.username;
      next();
    } else {
      res.status(403).json({
        msg: "You are not authenticated",
      });
    }
  } catch (e) {
    res.json({
      msg: "Incorrect inputs",
    });
  }
}

module.exports = authenticateMiddleware;