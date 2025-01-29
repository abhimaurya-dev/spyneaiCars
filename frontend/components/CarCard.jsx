"use client";
import React, { useState } from "react";

const CarCard = ({ car, onEdit, onDelete, manage, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ensure images exist and is an array
  const images = Array.isArray(car.images) ? car.images : [];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full max-w-sm shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
      <figure className="relative">
        {images.length > 0 ? (
          <>
            <img
              className="w-full h-48 md:h-56 lg:h-64 object-cover"
              src={images[currentImageIndex]}
              alt={car.title}
            />
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md"
                  onClick={handlePrevImage}
                >
                  ❮
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md"
                  onClick={handleNextImage}
                >
                  ❯
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-48 md:h-56 lg:h-64 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </figure>
      <div
        className="p-4 flex flex-col cursor-pointer"
        onClick={(e) => onClick()}
      >
        <div className="text-xl font-semibold">{car.carName}</div>
        <p className="text-gray-600 text-sm mt-1">{car.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {car.tags &&
            car.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-lg"
              >
                {tag}
              </span>
            ))}
        </div>
        {manage && (
          <div className="flex justify-between mt-4">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(car);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(car._id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
