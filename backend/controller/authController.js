//Sign UP , using bcrpyt
//sigin and return JWT
//how to throw an error
const User = require("../models/User");
const jwtToken = require("jsonwebtoken");

const userSchema = require("../validation/userSchema");
const { hashPassword, checkPassword } = require("../services/passwordService");

async function register(req, res, next) {
  //   const username = req.body.username;
  //   const password = req.body.password;
  //   const email = req.body.email;
  const { username, password, email } = req.body;
  //zod verfication
  const resValidation = userSchema.safeParse({
    username,
    password,
    email,
  });

  if (!resValidation.success) {
    next(new Error(resValidation.message));
  }
  try {
    const foundUsername = await User.findOne({
      email,
    });
    if (foundUsername) {
      throw new Error("found username , already registered");
    }

    const hashedPassword = await hashPassword(password);
    //saved the username and password , redirect to login page

    await User.create({ username, email, password: hashedPassword });

    return res.status(200).json({
      message: "User registered successfully",
      sucess: true,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { username, password } = req.body;
  const foundUsername = await User.findOne({
    username,
  });
  if (!foundUsername) {
    return next(new Error("Invalid username or password"));
  }
  const isMatch = await checkPassword(password, foundUsername.password);
  if (!isMatch) {
    return next(new Error("Invalid username or password"));
  }

  console.log(foundUsername, isMatch);

  //else return jwt token
  var token = jwtToken.sign({ username }, process.env.JWT_SECRET);

  //return jwt token
  return res.json({
    message: "Logged in successfully",
    token: token,
    success: true,
  });
}

module.exports = { register, login };
