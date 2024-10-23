import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="p-4 overflow-auto">{children}</main>
      <Navbar />
    </>
  );
}