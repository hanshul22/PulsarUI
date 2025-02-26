const jwt = require("jsonwebtoken");
const AdminModel = require("../model/Admin.Schema"); // Correct admin schema

const checkAdminAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        try {
            const token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const adminId = decoded.userID;

            req.user = await AdminModel.findById(adminId).select("-password");

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

module.exports = checkAdminAuth;
