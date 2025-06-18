
import React, { ReactNode } from "react";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 ml-[5.5%]">
        <NavBar />

        <main className="flex-1 overflow-y-auto  mt-[4.4%]  bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
