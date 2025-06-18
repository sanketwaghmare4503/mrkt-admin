"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../_context/GlobalContext";

export function MainPage() {
  const router = useRouter();
  const {userData}= useGlobalContext()

  const handleViewLogs = () => {    
    router.push("/logs");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome {userData.firstName} to the Admin Panel
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          {"Manage your application’s data, monitor performance, and access all administrative tools from this dashboard."}
        </p>

        <button
          onClick={handleViewLogs}
          className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          View  Logs
        </button>
      </div>
    </div>
  );
}
