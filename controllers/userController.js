const user = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailService = require("../services/emailService");

// API for user sign-up
const userSignUp = async (req, res) => {
  const { email, password, userName } = req.body;
  const userData = new user(req.body);
  try {
    const isUserExists = await user.findOne({ email: email });
    if (isUserExists) {
      return res.status(409).json({
        status: false,
        error: "User with this email is already exists",
      });
    }

    userData.password = await bcrypt.hash(password, 10);
    const filePath = `/uploads/${req.file.filename}`;
    userData.profilePic = filePath;
   
    if (userData !== null) {
      const secret = userData._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userid: userData._id }, secret, {
        expiresIn: "20m",
      });
      let yourName = 'Mahesh Sharma';
      let yourCompany = 'E-Commerce';
      let yourPosition = 'Manager';
      const link = `http://127.0.0.1:3000/api/user/verification/${userData._id}/${token}`;
      const info = await emailService(link, userName, email, yourName, yourPosition, yourCompany);
      if(info){
        await userData.save();
      }else {
        return res.status(400).json({
          status : false,
          message : "email not send"
        })
      }
    }
    return res.status(201).json({
      success: true,
      message: "Registration successfully Verification link sent on your email",
      data : userData
    });
  } catch (err) {
    res.status(201).json({
      status: false,
      message: err.message,
    });
  }
};

// API for Login User
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserLogin = await user.findOne({ email: email });
    if (isUserLogin !== null) {
      const pwdConfirmation = await bcrypt.compare(
        password,
        isUserLogin.password
      );
      if (pwdConfirmation && isUserLogin) {
        const token = jwt.sign(
          { id: isUserLogin._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "10m" }
        );
        res.status(200).json({
          status: true,
          message: "Login successfully",
          token: token,
        });
      } else {
        res.status(401).json({
          status: false,
          message: "Please Enter correct email and password",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: "this email is not registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// API for update user profile
const updateUserProfile = async (req, res) => {
  const { id, email, userName, userPhone, city, state } = req.body;
  try {
    const findUserData = await user.findOne({ _id: id });
    if (findUserData !== null) {
      const updateData = await user.updateOne({
        email,
        userName,
        userPhone,
        city,
        state,
      });
      if (req.file) {
        const filePath = `/uploads/${req.file.filename}`;
        findUserData.profilePic = filePath;
        await findUserData.save();
      }
      if (updateData !== null) {
        return res.status(200).json({
          status: true,
          message: "Data updated successfully",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Data not updated",
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "user id not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  userSignUp,
  userLogin,
  updateUserProfile,
};
