import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="container mx-auto">
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
