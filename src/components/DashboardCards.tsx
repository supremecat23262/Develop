"use client";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";

const cardData = [
  { title: "Balance General", amount: "$150,000.00", icon: <FaWallet size={30} />, color: "bg-blue-500" },
  { title: "Ingresos", amount: "$75,000.00", icon: <FaArrowUp size={30} />, color: "bg-green-500" },
  { title: "Egresos", amount: "$50,000.00", icon: <FaArrowDown size={30} />, color: "bg-red-500" },
];

export default function DashboardCards() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {cardData.map((card) => (
        <div key={card.title} className="flex items-center p-6 rounded-lg shadow-lg bg-white">
          <div className={`p-4 rounded-full text-white ${card.color}`}>
            {card.icon}
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-700">{card.title}</h2>
            <p className="text-xl font-bold">{card.amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
