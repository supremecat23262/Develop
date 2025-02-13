"use client";
import { FaBook, FaMobileAlt, FaPrint } from "react-icons/fa";

const cardData = [
  {
    title: "Educación",
    description: "Diseño, impartición, ventas",
    ingresos: "$30,000.00",
    egresos: "$7,000.00",
    icon: <FaBook size={40} />,
  },
  {
    title: "Desarrollo",
    description: "Apps, sitios web, soporte",
    ingresos: "$35,000.00",
    egresos: "$13,000.00",
    icon: <FaMobileAlt size={40} />,
  },
  {
    title: "Impresión 3D",
    description: "Impresiones, diseño, soporte",
    ingresos: "$23,000.00",
    egresos: "$5,000.00",
    icon: <FaPrint size={40} />,
  },
];

export default function DashboardCards() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {cardData.map((card) => (
        <div key={card.title} className="flex flex-col items-start p-6 rounded-lg shadow-lg bg-white">
          {/* Icono y Título */}
          <div className="flex items-center">
            <div className="p-4 bg-blue-500 rounded-full text-white">{card.icon}</div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-700">{card.title}</h2>
              <p className="text-sm text-gray-500">{card.description}</p>
            </div>
          </div>

          {/* Ingresos */}
          <div className="flex justify-between items-center w-full mt-4">
            <div className="flex flex-col items-center">
              <p className="text-md font-semibold text-green-500">Ingresos</p>
              <p className="text-xl font-bold">{card.ingresos}</p>
            </div>

            {/* Egresos */}
            <div className="flex flex-col items-center">
              <p className="text-md font-semibold text-red-500">Egresos</p>
              <p className="text-xl font-bold">{card.egresos}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
