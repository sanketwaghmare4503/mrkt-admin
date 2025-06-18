"use client";
import { Button, Divider, Sidebar } from "@atomos_tech/genesis";
import React, { useState } from "react";
import {

  RiArticleLine,
  RiLogoutBoxRLine,

 

} from "@remixicon/react";
import Image from "next/image";
import { logOut } from "@mirats/mirats-auth";

const navItem = [
  {
    label: "Links",
    items: [
      {
        label: "Logs",
        href: "/logs",
        icon: <RiArticleLine size={18} />, 
      },
      
    ],
  },
 

];



const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutclick,setLogoutClick]= useState(false)
  return (
    <section className="fixed left-0 z-[1800] bg-white">
      <Sidebar scroll collapsed={collapsed} setCollapsed={setCollapsed}>
        <Sidebar.Header collapsed={collapsed} setCollapsed={setCollapsed}>
          {collapsed ? (
            <Image
              src="/assets/logo.svg"
              alt="logo"
              width={200}
              height={45}
              priority
            />
          ) : (
            <Image
              src="/assets/logo-round.svg"
              alt="logo"
              width={40}
              height={45}
            />
          )}
        </Sidebar.Header>
        <Sidebar.Menu
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          navItems={navItem}
          scroll
        />

        <Sidebar.Footer
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        >
          <Divider className="mb-3" />
          {collapsed ? (
            <Button
              className="w-full"
              variant="outlined"
              intent="default-outlined"
              onClick={() => {setLogoutClick(true);logOut()}}
              disabled={logoutclick}
              startIcon={<RiLogoutBoxRLine size={20} />}
            >
              Logout
            </Button>
          ) : (
            
            <div className="h-[36] border border-gray-700 px-2 py-2 rounded-lg text-center">
              <RiLogoutBoxRLine size={20} color="#344054" />
            </div>
          )}
        </Sidebar.Footer>
      </Sidebar>
    </section>
  );
};

export default SideBar;