import User from "../../models/User.js";
import CustomError from "../../utils/customError.js";

const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      next(new CustomError("Email already exists", 409));
    }

    next(error);
  }
};

export default registerController;
