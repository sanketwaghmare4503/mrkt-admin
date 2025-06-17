"use client"
import { isLoggedIn, signIn } from "@mirats/mirats-auth";
import { ReactNode } from "react";


const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = isLoggedIn();

  if (!user) {
    signIn();
    return <></>;
  } else {
    return children;
  }
};

export default ProtectedRoute;