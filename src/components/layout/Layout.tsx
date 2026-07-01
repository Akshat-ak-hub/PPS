import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Layout;
