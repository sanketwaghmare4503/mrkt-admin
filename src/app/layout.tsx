import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@atomos_tech/genesis/style";
import "./globals.css";
import { cn } from "./utils/helper";
import LayoutWrapper from "./layoutwrapper";
import dynamic from "next/dynamic";
import { NoticeProvider } from "./_context/NoticeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mirats Mail",
  description: "Mirats Mail Management System",
  keywords: ["email", "template", "bulk mail", "Mirats", "mail management"],
  creator: "Mirats Insights",
};

const GlobalContext = dynamic(() => import("./_context/GlobalContext"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "theme-primary min-h-screen overflow-x-hidden"
        )}
      >
        <GlobalContext>
          <NoticeProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
        </NoticeProvider>
      </GlobalContext>
      </body>
    </html>
  );
}
