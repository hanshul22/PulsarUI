const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");

const checkUserAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  

  if (authorization) {
      try {
          const token = authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
          const userId = decoded.userID;

          req.user = await UserModel.findById(userId).select("-password");

          if (!req.user) {
              return res.status(401).send({ status: "failed", message: "Unauthorized User" });
          }

          next();
      } catch (error) {
          console.error("Error in middleware:", error);
          res.status(401).send({ status: "failed", message: "Unauthorized User" });
      }
  } else {
      res.status(401).send({ status: "failed", message: "Unauthorized User, No Token" });
  }
};

module.exports = checkUserAuth;

