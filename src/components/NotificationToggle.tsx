"use client";

interface NotificationToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function NotificationToggle({ enabled, onToggle }: NotificationToggleProps) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-sm">Notificar por correo:</span>
      <label htmlFor="notification-toggle" className="relative inline-block w-12 h-6">
        <input
          id="notification-toggle"
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-colors duration-300 ease-in-out"></span>
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out ${
            enabled ? "transform translate-x-6" : ""
          }`}
        ></span>
      </label>
    </div>
  );
}

