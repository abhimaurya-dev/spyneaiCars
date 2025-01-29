import Product from "../../models/Product.js";
import ProductImages from "../../models/ProductImages.js";

export const getAllProductController = async (req, res, next) => {
  try {
    const allProducts = await Product.find({});
    const modifiedProductsArray = await Promise.all(
      allProducts.map(async (product) => {
        const productImages = await ProductImages.find({
          associatedCarId: product._id,
        });

        const modifiedProduct = product.toObject();

        modifiedProduct["images"] = productImages.flatMap((img) => img.images);

        return modifiedProduct;
      })
    );
    res.status(200).json({
      success: true,
      allProducts: modifiedProductsArray,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
