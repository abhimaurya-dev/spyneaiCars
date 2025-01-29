import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import mongoose from "mongoose";

const loginController = async (req, res, next) => {
  const maxAgeInDays = 1;
  const maxAgeInMilliseconds = maxAgeInDays * 24 * 60 * 60 * 1000;
  try {
    const { email, password } = req.body;
    if (mongoose.ConnectionStates.connected) {
      res.status(200).json({ message: "db not connected" });
      next();
    }
    console.log({ email, password });
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(await user.comparePassword(password)))
      throw { status: 401, message: "Invalid Credentials" };
    console.log(user);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    console.log("got jwt");
    res.cookie("spyne-jwt-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: maxAgeInMilliseconds,
      sameSite: "strict",
    });
    console.log("success");
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default loginController;
