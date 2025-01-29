import CustomError from "../../utils/customError.js";
import Product from "../../models/Product.js";
import ProductImages from "../../models/ProductImages.js";

export const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });

    if (!product) {
      next(new CustomError("Product not found.", 404));
    }

    if (product.createdBy.toString() !== req.user.id.toString()) {
      next(
        new CustomError("You are not authorized to delete this product.", 403)
      );
    }

    await Product.findByIdAndDelete(id);
    await ProductImages.deleteOne({ associatedCarId: id });

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
