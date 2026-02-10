import { Bell, ShoppingCart, Globe, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Left: Logo + Toggle (optional later) */}
      <div className="flex items-center gap-4">
        <img
          src="/logo.png"
          alt="Lebrostone Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Language */}
        <div className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-black">
          <Globe size={18} />
          <span className="text-sm">English</span>
          <ChevronDown size={14} />
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-600 hover:text-black" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            1
          </span>
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer">
          <ShoppingCart size={20} className="text-gray-600 hover:text-black" />
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            6
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-sm">
            <p className="font-medium leading-none">Lebrostone</p>
            <p className="text-xs text-gray-500">Master Admin</p>
          </div>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  );
}
