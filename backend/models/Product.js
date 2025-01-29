import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Store the user's _id
    ref: "User", // Reference the User model
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
