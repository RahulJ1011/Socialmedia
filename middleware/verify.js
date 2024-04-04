const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config()

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(404).json({ msg: "Token not found" });
    }
    token = token.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT);
    req.user = verify;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
};


module.exports ={verifyToken}