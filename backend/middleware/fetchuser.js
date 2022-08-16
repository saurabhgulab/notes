var jwt = require("jsonwebtoken");
const JWT_SECRET = "Secret Key Pro Max";

//Get user details from the JWT token & add id to request object
fetchuser = (req, res, next) => {
  const token = req.header("jwtData");
  if (!token) {
    res.send(401).send({ error: "Authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.send(401).send({ error: "Authenticate using valid token" });
  }
};
module.exports = fetchuser;
