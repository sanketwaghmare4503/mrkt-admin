"use client";
import { Avatar, Skeleton } from "@atomos_tech/genesis";
import BreadcrumbsWrapper from "./BreadCrumbsComp";
import { useGlobalContext } from "../_context/GlobalContext";

export default function NavBar() {
  const { userData } = useGlobalContext();

  return (
    <nav className="flex   left-16 justify-between items-center fixed top-0 right-0 py-1 px-6 z-10 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex-1 px-4 min-w-0 py-4">
        <BreadcrumbsWrapper />
      </div>

      <div className="flex items-center space-x-6">
        {/* User Profile */}
        {userData ? (
          <Avatar
            type="image"
            size="sm"
            src={userData?.avatar || ""}
            alt="avatar"
            rounded
          />
        ) : (
          <Skeleton circle={true} />
        )}
      </div>
    </nav>
  );
}
