import mongoose from "mongoose";
export const mongodbConnect = () => {
  const mongoUri = process.env.MONGO_URI;
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to DB!!");
    })
    .catch((e) => {
      console.log(e);
    });
};
