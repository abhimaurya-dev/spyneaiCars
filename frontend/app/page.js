"use client";
import React, { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";
import CarDetailsModal from "@/components/CarDetailsModal";
import { fetchApi } from "@/utils/fetchApi";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [carsData, setCarsData] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const getCarsData = async () => {
      const res = await fetchApi("/cars/getAllCars", [], "GET");
      setCarsData(res.allProducts);
      setFilteredCars(res.allProducts); // Initially show all cars
    };

    getCarsData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredCars(carsData); // If query is empty, show all cars
    } else {
      const filtered = carsData.filter((car) =>
        [car.title, car.description, ...car.tags]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
      setFilteredCars(filtered); // Show only filtered cars
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Our Cars</h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Cars List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => (
            <CarCard
              key={index}
              car={car}
              onClick={() => setSelectedCar(car)}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No cars found matching your search.
          </p>
        )}
      </div>

      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  );
}
