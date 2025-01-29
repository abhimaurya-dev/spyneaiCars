import ProductImages from "../../models/ProductImages";

export const getProductImageController = async (req, res, next) => {
  try {
    const { carId } = req.body;
    const productImages = await ProductImages.findById({
      associatedCarId: carId,
    });
    res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    next(error);
  }
};
