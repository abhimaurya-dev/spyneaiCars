"use client";

import { fetchApi } from "@/utils/fetchApi";
import React, { useState, useEffect } from "react";

const AddUpdateCarModal = ({
  car,
  onClose,
  onUpdate,
  onAdd,
  mode = "update",
}) => {
  const [carDetails, setCarDetails] = useState({
    carName: "",
    description: "",
    tags: "",
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [carId, setCarId] = useState(null); // Store carId once car is created
  const [isCarCreated, setIsCarCreated] = useState(false); // Track car creation state

  useEffect(() => {
    if (mode === "update" && car) {
      setCarDetails({
        carName: car.carName || "", // Ensure it's an empty string if undefined
        description: car.description || "",
        tags: car.tags ? car.tags.join(", ") : "", // Ensure tags are initialized
        images: car.images || [], // Ensure it's an empty array if undefined
      });
    } else {
      setCarDetails({
        carName: "",
        description: "",
        tags: "",
        images: [],
      });
    }
  }, [car, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    console.log(carDetails);
    const files = Array.from(e.target.files);
    const totalImages =
      carDetails.images.length + imageFiles.length + files.length;

    if (totalImages > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    setImageFiles([...imageFiles, ...files]);
  };

  const handleImageUpload = async () => {
    if (!imageFiles || imageFiles.length === 0) {
      alert("Please select images to upload.");
      return;
    }

    setUploading(true);

    const base64Images = await Promise.all(
      Array.from(imageFiles).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      })
    );

    // Send images with carId to the backend for upload
    try {
      const response = await fetchApi(
        "/carImage/upload",
        { carId: carId || car._id, images: base64Images },
        "POST"
      );

      if (!response.success) {
        throw new Error("Failed to upload images");
      }

      // Assuming the backend returns the new images array (if applicable)
      const updatedImages = response.images.images || []; // Ensure it's an array
      if (Array.isArray(updatedImages)) {
        setCarDetails((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...updatedImages],
        }));
      } else {
        console.error("Updated images is not an array:", updatedImages);
      }

      alert("Images uploaded successfully!");
      onClose();
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageRemove = (index, fromExisting = false) => {
    if (fromExisting) {
      // Remove the image from the existing images
      const updatedImages = [...carDetails.images];
      updatedImages.splice(index, 1);
      setCarDetails((prevState) => ({
        ...prevState,
        images: updatedImages,
      }));
    } else {
      // Remove the image from the newly selected files
      const updatedFiles = [...imageFiles];
      updatedFiles.splice(index, 1);
      setImageFiles(updatedFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = carDetails.tags.split(",").map((tag) => tag.trim());

    const carData = { ...carDetails, tags: tagsArray };

    if (mode === "update") {
      onUpdate(car._id, carData);
      setIsCarCreated(true);
    } else {
      try {
        const response = await fetchApi("/cars/createCars", carData, "POST");

        if (!response.success) {
          throw new Error("Failed to create car");
        }

        console.log(response);
        setCarId(response.product._id);
        setIsCarCreated(true);
        setCarDetails({
          carName: response.product.carName,
          tags: response.product.tags,
          description: response.product.response,
          images: response.product.images,
        });
      } catch (error) {
        console.error("Error creating car:", error);
        alert("Failed to add new car. Please try again.");
      }
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        {isCarCreated ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Upload Images for the Car
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="images" className="block text-sm font-medium">
                  Images (up to 10)
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                  className="file-input file-input-bordered w-full"
                />
                <div className="mt-2 flex gap-4">
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="btn btn-primary"
                    disabled={uploading || imageFiles.length === 0}
                  >
                    {uploading ? "Uploading..." : "Upload Images"}
                  </button>
                  <button type="button" className="btn" onClick={onClose}>
                    Cancel
                  </button>
                </div>

                {/* Image Preview */}
                <div className="mt-4">
                  {imageFiles.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {imageFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => handleImageRemove(index)}
                            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="modal-action">
                <button type="button" className="btn" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleImageUpload}
                >
                  {uploading ? "Uploading..." : "Upload Images"}
                </button>
              </div> */}
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">
              {mode === "update" ? "Update Car Details" : "Add New Car"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="carName" className="block text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id="carName"
                  name="carName"
                  value={carDetails.carName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={carDetails.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={carDetails.tags}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="modal-action">
                <button type="button" className="btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {mode === "update" ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddUpdateCarModal;
