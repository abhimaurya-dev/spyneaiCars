"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const CarDetailsModal = ({ car, onClose }) => {
  if (!car) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-5 sm:p-6 rounded-lg shadow-lg w-full max-w-[90%] sm:max-w-[500px] max-h-[85vh] overflow-auto relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center">
          {car.title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {car.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative w-full flex items-center justify-center">
          {car.images && car.images.length > 0 ? (
            <>
              <img
                src={car.images[currentImageIndex]}
                alt={`Car ${currentImageIndex}`}
                className="rounded-lg w-full h-auto max-h-60 sm:max-h-80 object-cover"
              />

              {/* Left Arrow */}
              {car.images.length > 1 && (
                <button
                  className="absolute left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  onClick={prevImage}
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Right Arrow */}
              {car.images.length > 1 && (
                <button
                  className="absolute right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  onClick={nextImage}
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </>
          ) : (
            <div className="w-full h-52 flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        {/* Indicator Dots */}
        {car.images && car.images.length > 0 && (
          <div className="flex justify-center gap-2 mt-3">
            {car.images.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="mt-4 text-gray-700 text-center text-sm sm:text-base">
          {car.description}
        </p>

        {/* Close Button */}
        <button className="btn btn-error w-full mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CarDetailsModal;
