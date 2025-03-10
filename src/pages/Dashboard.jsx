
import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Transactions Aggregated</h2>
        <div className="mb-4 flex space-x-2">
          <button className="px-3 py-1 bg-gray-100 rounded">12 months</button>
          <button className="px-3 py-1 bg-gray-100 rounded">30 days</button>
          <button className="px-3 py-1 bg-primary text-white rounded">7 days</button>
        </div>
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
          <p className="text-gray-500">Transaction chart will appear here</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Users Aggregated</h2>
        <div className="mb-4 flex space-x-2">
          <button className="px-3 py-1 bg-gray-100 rounded">12 months</button>
          <button className="px-3 py-1 bg-gray-100 rounded">30 days</button>
          <button className="px-3 py-1 bg-primary text-white rounded">7 days</button>
        </div>
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
          <p className="text-gray-500">Users chart will appear here</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">First Time Users</h2>
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
          <p className="text-gray-500">First time users data will appear here</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Repeat Users</h2>
        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
          <p className="text-gray-500">Repeat users data will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
