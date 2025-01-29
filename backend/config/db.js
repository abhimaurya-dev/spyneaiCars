import mongoose from "mongoose";
export const mongodbConnect = () => {
  const mongoUri = process.env.MONGO_URI;
  console.log(mongoUri);
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to DB!!");
    })
    .catch((e) => {
      console.log(e);
    });
};
