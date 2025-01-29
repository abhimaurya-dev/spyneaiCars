import Product from "../../models/Product.js";
import ProductImages from "../../models/ProductImages.js";
import CustomError from "../../utils/customError.js";

export const createProductController = async (req, res, next) => {
  try {
    const { carName, description, tags } = req.body;
    console.log(req.user.id);
    const createdBy = req.user.id;
    if (!carName || !description || !tags) {
      next(new CustomError("All fields are required.", 400));
    }

    const newProduct = new Product({
      carName,
      description,
      tags,
      createdBy,
    });

    const savedProduct = await newProduct.save();

    const carImage = await ProductImages.find({
      associatedCarId: savedProduct._id,
    });

    const modifiedSavedProduct = savedProduct.toObject();
    modifiedSavedProduct["images"] = carImage.images || [];

    res.status(201).json({
      success: true,
      product: modifiedSavedProduct,
    });
  } catch (error) {
    console.log(error);
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      next(new CustomError(error.message, 400));
    }
    next(error);
  }
};
