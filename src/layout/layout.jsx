import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/header';
import Footer from './footer/footer';

export default function Layout() {
  return (
    <div className="w-full relative m-auto flex flex-col min-h-[100vh] px-4 md:px-6 lg:px-8">
      <Header />
      <main className="container m-auto flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
