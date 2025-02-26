const AdminModel = require("../model/Admin.Schema.js");
const TokenBlacklist = require('../model/TokenBlacklist.modal.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/emailConfig.js");

class UserControllers {
  static adminRegistration = async (req, res) => {
    try {
      const { name, email, password, password_confirmation } = req.body;

      // Check for missing fields
      if (!name || !email || !password || !password_confirmation) {
        return res.status(400).send({ status: "failed", msg: "All fields are required" });
      }

      // Check if email already exists
      const existingUser = await AdminModel.findOne({ email });
      if (existingUser) {
        return res.status(409).send({ status: "failed", msg: "Email already exists" });
      }

      // Check if passwords match
      if (password !== password_confirmation) {
        return res.status(400).send({ status: "failed", msg: "Passwords do not match" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save the new admin
      const newAdmin = new AdminModel({
        name,
        email,
        password: hashedPassword,
        provider: "JWT",
        image: "data:image/jpeg;base64,...", // Replace with dynamic image if needed
      });

      await newAdmin.save();

      // Send success response
      res.status(201).send({ status: "success", msg: "Admin registered successfully", data: newAdmin });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).send({ status: "failed", msg: "Internal server error" });
    }
  };


  static adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await AdminModel.findOne({ email: email });
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            return res.send({
              status: "success",
              msg: "Login successful",
              token: token,
              user: user,
            });
          } else {
            return res.status(401).send({
              status: "failed",
              msg: "Email or Password is incorrect",
            });
          }
        } else {
          return res.status(404).send({ status: "failed", msg: "Email does not exist" });
        }
      } else {
        return res.status(400).send({ status: "failed", msg: "All fields are required" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: "failed", msg: "Unable to login" });
    }
  };


  static changeAdminPassword = async (req, res) => {
    const { old_password, new_password, confirmation_new_password } = req.body;
  
    if (!old_password || !new_password || !confirmation_new_password) {
      return res.status(400).send({ status: "failed", msg: "All fields are required" });
    }
  
    try {
      const user = await AdminModel.findById(req.user._id);
      const isMatch = await bcrypt.compare(old_password, user.password);
      if (!isMatch) {
        return res.status(401).send({ status: "failed", msg: "Old password is incorrect" });
      }
  
      const isSameAsOld = await bcrypt.compare(new_password, user.password);
      if (isSameAsOld) {
        return res.status(400).send({ status: "failed", msg: "New password must be different from the old password" });
      }
  
      if (new_password !== confirmation_new_password) {
        return res.status(400).send({ status: "failed", msg: "New Password and Confirm New Password do not match" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(new_password, salt);
  
      await AdminModel.findByIdAndUpdate(req.user._id, {
        $set: { password: newHashPassword }
      });
  
      return res.send({ status: "success", msg: "Password changed successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: "failed", msg: "An error occurred while changing the password" });
    }
  };

  static sendAdminPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await AdminModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });
        const link = `http://localhost:3000/reset/${user._id}/${token}`;
        console.log(link);

        let info = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "LegoUI - Reset your account password",
          html: `Click here to <a href=${link}>Reset your password</a>`,
        });

        return res.send({ status: "success", msg: "Password reset link sent to your email", "info": info });
      } else {
        return res.status(404).send({ status: "failed", msg: "Email does not exist" });
      }
    } else {
      return res.status(400).send({ status: "failed", msg: "Email field is required" });
    }
  };

  static sendAdminPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;
    const user = await AdminModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          return res.status(400).send({ status: "failed", msg: "Password and Confirm Password do not match" });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await AdminModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
          return res.send({
            status: "success",
            msg: "Password changed successfully"
          });
        }
      } else {
        return res.status(400).send({ status: "failed", msg: "All fields are required" });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({ status: "failed", msg: "Invalid token" });
    }
  };

  static adminLogout = async (req, res) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer', ' ');
      const blacklistedToken = new TokenBlacklist({ token });
      console.log("blacklist function called",token);
      
      await blacklistedToken.save();
      
      return res.send({ status: "success", msg: "Logout successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: "failed", msg: "Logout failed" });
    }
  };

  static loggedAdmin = async (req, res) => {
    try {
      if (!req.user) {
        console.log(error);
        return res.status(404).send({ status: "failed", msg: "User not found" });
        
      }
      console.log(req.user);
      return res.send({ status: "success", data: req.user });
      
    } catch (error) {
      console.error("Error in loggedUser:", error);
      return res.status(500).send({ status: "failed", msg: "Server Error" });
    }
  };
}

module.exports = UserControllers;
