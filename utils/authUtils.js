require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/userModel")
const utils = {};

utils.tokenGenerate = (id) => {
  const key = jwt.sign(
    JSON.stringify({
        UserId : id,
    }),
    process.env.JWTKEY
  );

  return key;
};

utils.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.cookie?.split("=")[2];
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Token Not Found",
      });
    }

    const verifyToken = await User.findOne({
      where: {
        token: token,
      },
    });
    if (!verifyToken) {
      return res.status(401).json({
        statusCode: 401,
        message: "Un Authenticate",
      });
    } else {
     
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      statusCode: 401,
      message: "Un Authenticate",
    });
  }
};

module.exports = utils;
