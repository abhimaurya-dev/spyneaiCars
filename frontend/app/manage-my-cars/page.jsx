"use client";
import React, { useEffect, useState } from "react";
import AddUpdateCarModal from "@/components/AddUpdateCarModal";
import CarCard from "@/components/CarCard";
import CarDetailsModal from "@/components/CarDetailsModal";
import { fetchApi } from "@/utils/fetchApi";

const page = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // Default mode to "add"

  useEffect(() => {
    const getUserCars = async () => {
      const res = await fetchApi("/cars/getUserCars", [], "GET");
      console.log(res);
      setCars(res.products);
    };

    getUserCars();
  }, []);

  const handleEdit = (car) => {
    setSelectedCar(car);
    setModalMode("update"); // Switch to update mode when editing a car
    setShowModal(true);
  };

  const handleDelete = async (carId) => {
    setCars(cars.filter((car) => car._id !== carId));
    await fetchApi(`/cars/delete/${carId}`, [], "DELETE");
  };

  const handleUpdate = async (carId, updatedCar) => {
    try {
      setCars(
        cars.map((car) => (car._id === carId ? { ...car, ...updatedCar } : car))
      );

      const response = await fetchApi(
        `/cars/update/${carId}`,
        updatedCar,
        "PUT"
      );

      if (!response.success) {
        console.error("Failed to update the car");
        return;
      }
    } catch (error) {
      console.error("Error updating the car:", error);
    }
  };

  const handleAdd = async (newCar) => {
    try {
      // Send the new car to the backend
      const response = await fetchApi(
        "/cars", // Assuming this is the endpoint to add a new car
        newCar,
        "POST"
      );

      if (!response.success) {
        // Handle failure (optional: show error to user)
        console.error("Failed to add the car");
        return;
      }

      // If the car was added successfully, update the local state
      setCars((prevCars) => [
        ...prevCars,
        { ...newCar, id: response.product._id },
      ]); // Assuming the backend returns the car id
    } catch (error) {
      // Handle error (optional: show error to user)
      console.error("Error adding the car:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Manage My Cars
      </h1>

      {/* Add New Car Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => {
            setModalMode("add"); // Set mode to "add" when opening the modal for a new car
            setShowModal(true);
          }}
          className="btn btn-primary"
        >
          Add New Car
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <CarCard
            key={car._id}
            car={car}
            onEdit={handleEdit}
            onDelete={handleDelete}
            manage={true}
            onClick={() => setSelectedCar(car)}
          />
        ))}
      </div>

      {/* Modal for Adding or Updating a Car */}
      {showModal && (
        <AddUpdateCarModal
          car={selectedCar}
          onClose={closeModal}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
          mode={modalMode}
        />
      )}
      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  );
};

export default page;
