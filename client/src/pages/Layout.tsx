import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/footer";
import NavigationBar from "../components/common/navigationBar";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="container mx-auto">
        <NavigationBar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
