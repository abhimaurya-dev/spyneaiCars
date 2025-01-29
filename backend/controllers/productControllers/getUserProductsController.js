import Product from "../../models/Product.js";
import ProductImages from "../../models/ProductImages.js";

export const getUserProductsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const userProducts = await Product.find({ createdBy: userId });

    // Use Promise.all to wait for all async operations to complete
    const modifiedProductsArray = await Promise.all(
      userProducts.map(async (product) => {
        const productImages = await ProductImages.find({
          associatedCarId: product._id,
        });

        // Convert Mongoose document to plain object and add images
        const modifiedProduct = product.toObject();

        // Extract images from all matched documents
        modifiedProduct["images"] = productImages.flatMap((img) => img.images);

        return modifiedProduct;
      })
    );

    res.status(200).json({
      success: true,
      products: modifiedProductsArray,
    });
  } catch (error) {
    next(error);
  }
};
