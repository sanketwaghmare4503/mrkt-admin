import React from "react";

const Header: React.FC = () => {
  return (
    <div className="bg-gray-100 border-b-2 px-4 pb-4 pt-6">
      <div className="flex items-start gap-2 mb-1">
        <div className="flex flex-col">
          <h2 className="text-black font-inter text-[18px] font-bold leading-[28px]">
            Email Logs Dashboard
          </h2>
          <p className="text-sm text-gray-600">
            Monitor and review email activity, delivery status, and detailed log information in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
