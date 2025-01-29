import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const loginController = async (req, res, next) => {
  const maxAgeInDays = 1;
  const maxAgeInMilliseconds = maxAgeInDays * 24 * 60 * 60 * 1000;
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      throw { status: 401, message: "Invalid Credentials" };

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.cookie("spyne-jwt-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: maxAgeInMilliseconds,
      sameSite: "strict",
    });
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(error);
  }
};

export default loginController;
