const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const dotenv = require("dotenv")
dotenv.config();

const register = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password, Gender, Country, Profile } =
      req.body;

    const isUser = await User.findOne({ Email });
    if (isUser) {
      return res.status(403).json({
        msg: "This Email Id is already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new User({
      FirstName,
      LastName,
      Email,
      Password: hashedPassword,
      Gender,
      Country,
      Profile,
    });

    await newUser.save();

    return res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: err });
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const isUser = await User.findOne({ Email });
    if (!isUser) {
      return res.status(404).json({ msg: "User not found" });
    } else {
      const check = await bcrypt.compare(Password, isUser.Password);
      if (!check) {
        return res.status(403).json({ msg: "Wrong Password" });
      }

      const token = jwt.sign(
        { id: isUser._id },
        process.env.JWT
      );

      const loggedUser = isUser.toObject();
      delete loggedUser.Password;

      return res.status(201).json({ token, loggedUser });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
};

module.exports = { login, register };
