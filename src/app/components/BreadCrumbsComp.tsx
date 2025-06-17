"use client";
import { BreadCrumb } from "@atomos_tech/genesis";
import { RiDashboardLine, RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "../utils/helper";

const capitalizeFirstLetter = (text: string) => {
  return text
    .split(" ")
    .map(
      (word) => word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase()
    )
    .join(" ");
};

const BreadcrumbsWrapper = () => {
  const pathname = usePathname();
  const pathNames = pathname.split("/").filter((x) => x);

  return (
    <BreadCrumb
      aria-label="breadcrumb"
    
      separator={<RiArrowRightSLine size={18} className="text-gray-400" />}
    >
      <Link href="/">
        <RiDashboardLine size={18} className="text-gray-700" />
      </Link>
      {pathNames?.map((path, index) => {
        const href = `/${pathNames.slice(0, index + 1).join("/")}`;
        const isActive = href === pathname;
        const isLast = index === pathNames.length - 1;
        
        const isId = /^[0-9a-fA-F]{24}$/.test(path);
        const displayName = isId
          ? "overview"
          : capitalizeFirstLetter(path?.replace(/-/g, " "));

        return (
          <React.Fragment key={href}>
            <Link
              href={href}
              className={cn(
                isActive
                  ? "bg-gray-200 text-gray-800 px-3 py-[6px] rounded-lg capitalize"
                  : "text-decoration-none text-inherit px-3 py-[6px]",
                isLast ? "font-semibold" : ""
              )}
            >
              {displayName}
            </Link>
          </React.Fragment>
        );
      })}
    </BreadCrumb>
  );
};

export default BreadcrumbsWrapper;
