const { hashPassword, comparePassWord } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    console.log(name);

    //validation
    if (!name) {
      return res.send({ error: "Name is require" });
    }
    if (!email) {
      return res.send({ error: "Email is require" });
    }
    if (!password) {
      return res.send({ error: "Password is require" });
    }
    if (!phone) {
      return res.send({ error: "Phone is require" });
    }
    if (!address) {
      return res.send({ error: "Address is require" });
    }
    //check user
    const exisitinguser = await userModel.findOne({ email });
    // exisiting user
    if (exisitinguser) {
      return res
        .status(200)
        .send({ success: true, message: "Already Register please login" });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "user Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

// POST Login req

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not register",
      });
    }

    const match = await comparePassWord(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// forgot password controller

const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    console.log(email, answer, newPassword);
    if (!email) {
      return res.status(400).send({ message: "email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "newPasword is required" });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong email or answer",
      });
    }
    const hashed = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
};
