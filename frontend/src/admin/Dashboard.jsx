import {
    ClipboardList,
    Store,
    Package,
    Users,
    CheckCircle,
    Clock,
    XCircle,
    Truck,
  } from "lucide-react";
  
  const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white rounded-lg p-4 flex items-center gap-4 border">
      <div className="p-3 bg-gray-100 rounded">
        <Icon size={22} className="text-gray-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
  
  const StatusCard = ({ label, value, color }) => (
    <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between border">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  );
  
  export default function Dashboard() {
    return (
      <div className="space-y-6">
        {/* Heading */}
        <div>
          <h1 className="text-xl font-semibold">Welcome Lebrostone</h1>
          <p className="text-sm text-gray-500">
            Monitor your business analytics and statistics.
          </p>
        </div>
  
        {/* Business Analytics */}
        <div className="bg-white rounded-lg p-6 border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Business Analytics</h2>
            <select className="border rounded px-3 py-1 text-sm">
              <option>Overall statistics</option>
              <option>Today</option>
              <option>This Month</option>
            </select>
          </div>
  
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={ClipboardList} label="Total Orders" value="6" />
            <StatCard icon={Store} label="Total Stores" value="0" />
            <StatCard icon={Package} label="Total Products" value="6" />
            <StatCard icon={Users} label="Total Customers" value="6" />
          </div>
  
          {/* Order Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <StatusCard label="Pending" value="6" color="text-blue-600" />
            <StatusCard label="Confirmed" value="0" color="text-green-600" />
            <StatusCard label="Packaging" value="0" color="text-orange-500" />
            <StatusCard label="Out for delivery" value="0" color="text-purple-600" />
            <StatusCard label="Delivered" value="0" color="text-green-700" />
            <StatusCard label="Canceled" value="0" color="text-red-600" />
            <StatusCard label="Returned" value="0" color="text-yellow-600" />
            <StatusCard label="Failed to deliver" value="0" color="text-red-700" />
          </div>
        </div>
  
        {/* Admin Wallet */}
        <div className="bg-white rounded-lg p-6 border space-y-4">
          <h2 className="font-semibold">Admin Wallet</h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={CheckCircle} label="In-House Earning" value="₹0.00" />
            <StatCard icon={Clock} label="Commission Earned" value="₹0.00" />
            <StatCard icon={Truck} label="Delivery Charge Earned" value="₹0.00" />
            <StatCard icon={XCircle} label="Pending Amount" value="₹0.00" />
          </div>
        </div>
      </div>
    );
  }
  