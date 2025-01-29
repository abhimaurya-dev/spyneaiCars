import Product from "../../models/Product.js";
import ProductImages from "../../models/ProductImages.js";
import CustomError from "../../utils/customError.js";

export const uploadProductImageController = async (req, res, next) => {
  try {
    const { carId, images } = req.body;
    const car = await Product.findById({ _id: carId });
    if (!car) {
      next(new CustomError("Car not exist", 404));
    }
    const uploadedProductImage = new ProductImages({
      associatedCarId: carId,
      images: images,
    });
    await uploadedProductImage.save();
    res.status(201).json({
      success: true,
      images: uploadedProductImage,
    });
  } catch (error) {
    next(error);
  }
};
