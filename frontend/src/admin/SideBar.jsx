import { useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tag,
  Image,
  Megaphone,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";

const SideBarItem = ({ icon: Icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer
    ${active ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-gray-100"}`}
  >
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const DropdownSectionBar = ({ title, icon: Icon, items ,href }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 py-2 cursor-pointer text-gray-600 hover:bg-gray-100 rounded"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} />
          <span className="text-sm font-semibold">{title}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="ml-9 mt-1 space-y-1">
          {items.map((item) => (
            <Link to={href || "#"}
              key={item}
              className="text-sm text-gray-600 px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SideBar() {
  return (
    <div className="flex g">
    <aside className="w-64 h-screen bg-white border-r flex flex-col">

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
        <SideBarItem icon={LayoutDashboard} label="Dashboard" active />

        <SideBarItem icon={ShoppingCart} label="POS" />

        <div className="text-xs text-gray-400 px-4 mt-4">ORDER MANAGEMENT</div>
        <DropdownSectionBar
          title="Orders"
          icon={ShoppingCart}
          items={["All Orders", "Pending", "Completed"]}
        />
        <DropdownSectionBar
          title="Refund Requests"
          icon={Package}
          items={["Pending", "Approved", "Rejected"]}
        />

        <div className="text-xs  text-gray-400 px-4 mt-4">PRODUCT MANAGEMENT</div>
        <DropdownSectionBar
          title="Category Setup"
          icon={Tag}
          items={["Add Category", "Category List"]}
        />
        <DropdownSectionBar
          title="Brands"
          icon={Package}
          items={["Add Brand", "Brand List"]}
        />
        <DropdownSectionBar
          title="Product Gallery"
          icon={Image}
          items={["Upload Images", "Gallery List"]}
        />

        <div className="text-xs text-gray-400 px-4 mt-4">PROMOTION</div>
        <DropdownSectionBar
          title="Banners"
          icon={Megaphone}
          items={["Add Banner", "Banner List"]}
        />
        <DropdownSectionBar
          title="Offers & Deals"
          icon={Tag}
          items={["Create Offer", "Offers List"]}
        />
      </div>
    </aside>
    <Outlet />
    <Dashboard/>
    </div>
  );
}
