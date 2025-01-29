import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true,
  },
  associatedCarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const ProductImages = mongoose.model("ProductImages", productImageSchema);

export default ProductImages;
