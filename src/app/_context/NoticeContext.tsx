"use client";
import { Notice } from "@atomos_tech/genesis";
import React, { createContext, useContext, useState, ReactNode, useRef } from "react";

type NoticeType = "success" | "error" | "warning" | "info";

interface NoticeContextType {
  showNotice: (type: NoticeType, message: string) => void;
}

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

export const useNotice = () => {
  const context = useContext(NoticeContext);
  if (!context) throw new Error("useNotice must be used within NoticeProvider");
  return context;
};

export const NoticeProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NoticeType>("success");
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNotice = (type: NoticeType, msg: string) => {
    // Clear previous timeout if any
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setType(type);
    setMessage(msg);
    setVisible(true);

    // Auto-close after 5 seconds
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  return (
    <NoticeContext.Provider value={{ showNotice }}>
      {children}
      <Notice
        open={visible}
        setOpen={setVisible}
        variant={type}
        noticeTitle={type.charAt(0).toUpperCase() + type.slice(1)}
        position="top"
        className="!max-w-[400px]"
      >
        {message}
      </Notice>
    </NoticeContext.Provider>
  );
};
