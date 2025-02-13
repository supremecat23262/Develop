"use client";
import { useState } from "react";

// Datos de los clientes potenciales (los clientes iniciales)
const potentialClients = [
  { name: "Juan Pérez", service: "Educación", source: "Website" },
  { name: "María López", service: "Desarrollo", source: "WhatsApp" },
  { name: "Carlos García", service: "Impresión 3D", source: "Instagram" },
  { name: "Ana Rodríguez", service: "Educación", source: "Website" },
  { name: "Luis Martínez", service: "Desarrollo", source: "WhatsApp" },
  { name: "Patricia Fernández", service: "Impresión 3D", source: "Instagram" },
];

export default function PotentialClients() {
  const [currentPage, setCurrentPage] = useState(0);
  const clientsPerPage = 3;

  // Filtrar los clientes para la página actual
  const currentClients = potentialClients.slice(
    currentPage * clientsPerPage,
    (currentPage + 1) * clientsPerPage
  );

  // Manejar la navegación a la página anterior
  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage === 0 ? 0 : prevPage - 1));
  };

  // Manejar la navegación a la página siguiente
  const handleNext = () => {
    const totalPages = Math.ceil(potentialClients.length / clientsPerPage);
    setCurrentPage((prevPage) => (prevPage === totalPages - 1 ? prevPage : prevPage + 1));
  };

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700">Potenciales Clientes</h2>
      
      {/* Vista de clientes actuales como "bloques" */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClients.map((client, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="flex items-center space-x-4">
              {/* Icono de servicio */}
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <p className="text-xl">{client.service.charAt(0)}</p> {/* Inicial del servicio */}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">{client.name}</p>
                <p className="text-sm text-gray-600">{client.service}</p>
                <p className="text-sm text-gray-600">{client.source}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación entre las páginas de clientes */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Atrás
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
