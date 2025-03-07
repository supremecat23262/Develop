"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";

interface User {
  name?: string;
  image?: string;
}

export default function ProfileSection({ user }: { user?: User }) {
  const [profileImage, setProfileImage] = useState(user?.image || "/default-profile.png");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="relative w-14 h-14">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profile-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="profile-upload" className="cursor-pointer">
            <Image
              src={profileImage}
              alt={`Foto de perfil de ${user?.name || "Usuario"}`}
              width={56}
              height={56}
              className="rounded-full border border-gray-300 object-cover"
              unoptimized={true} // Evita errores con imágenes base64
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-25 flex items-center justify-center rounded-full transition-opacity">
              <span className="text-white text-xs font-semibold opacity-0 hover:opacity-100 transition-opacity">
                Cambiar
              </span>
            </div>
          </label>
        </div>
        <span className="text-gray-700 font-semibold">{user?.name || "Usuario"}</span>
      </div>
      <button
        onClick={() => signOut()}
        className="text-gray-600 hover:text-red-500 text-2xl transition-colors"
      >
        <FiLogOut />
      </button>
    </div>
  );
}
