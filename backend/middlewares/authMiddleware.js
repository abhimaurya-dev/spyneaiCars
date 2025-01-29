import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });
    req.user = user;
    next();
  });
};

// export const isAuthenticated = (req, res, next) => {
//   console.log(req.headers.cookie);
//   const token = req.cookies?.["spyne-jwt-token"];
//   if (!token) next(new CustomError("Unauthorized", 401));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) next(new CustomError("Invalid Token", 403));
//     req.user = user;
//     next();
//   });
// };
