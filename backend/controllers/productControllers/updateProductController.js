import ProductImages from "../../models/ProductImages.js";
import CustomError from "../../utils/customError.js";
import Product from "../../models/Product.js";

export const updateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { carName, description, tags } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      next(new CustomError("Product not found.", 404));
    }

    if (product.createdBy.toString() !== req.user.id.toString()) {
      next(
        new CustomError("You are not authorized to update this product.", 403)
      );
    }

    product.carName = carName || product.carName;
    product.description = description || product.description;
    product.tags = tags || product.tags;

    const updatedProduct = await product.save();
    const productImages = await ProductImages.find({
      associatedCarId: product._id,
    });

    const modifiedUpdatedProduct = updatedProduct.toObject();
    modifiedUpdatedProduct["images"] = productImages.images;

    res.status(200).json({
      success: true,
      product: modifiedUpdatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
