'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaUser, FaFileInvoiceDollar, FaUsers, FaMoneyBillWave, FaFileAlt, FaCog } from 'react-icons/fa';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: <FaHome size={20} /> },
  { name: 'Leads', href: '/leads', icon: <FaUser size={20} /> },
  { name: 'Cotizaciones', href: '/cotizaciones', icon: <FaFileInvoiceDollar size={20} /> },
  { name: 'Clientes', href: '/clientes', icon: <FaUsers size={20} /> },
  { name: 'Ingresos/Egresos', href: '/ingresos-egresos', icon: <FaMoneyBillWave size={20} /> },
  { name: 'Docs', href: '/docs', icon: <FaFileAlt size={20} /> },
  { name: 'Configuraciones', href: '/private', icon: <FaCog size={20} /> },
];

export default function Sidebar() {
  const [active, setActive] = useState('/dashboard');

  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-5">Panel</h1>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} onClick={() => setActive(item.href)}>
            <div className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-gray-700 transition ${active === item.href ? 'bg-gray-600' : ''}`}>
              {item.icon}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
