"use client";
import Link from "next/link";
import "./style.css"
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "./elements";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const path = usePathname();

  return (
    <div className={`${path === "/" ? 'hidden' : ''}`}>
      <nav className="block w-full max-w-screen px-4 py-4 mx-auto bg-background bg-opacity-90 sticky top-3 shadow-2xl lg:px-8 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
        <div className="container flex flex-wrap items-center justify-end lg:justify-center mx-auto text-slate-800">
          <div className="bg-background rounded-xl p-5 py-1.5 absolute left-0 mx-4 flex justify-center items-center animate-inicio z-[99999]">
            <Link
              href="/"
              className=" block cursor-pointer text-foreground font-bold text-2xl"
              prefetch={false}>
              Aridity Index
            </Link>
          </div>

          <div className="md:hidden">
            <button
              className="relative h-8 max-h-[40px] w-8 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={toggleMobileMenu}
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  stroke="var(--foreground)"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 10h25M4 20h25M4 30h25"
                  ></path>
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 min-h-screen w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden z-50`}
          >
            <div className="flex flex-row items-center border-b pb-4">
              <Link
              href="/"
              className="cursor-pointer text-foreground font-bold text-xl pt-4 ps-4"
              prefetch={false}>
              Aridity Index
            </Link>
              <button
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 text-foreground hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col h-full gap-4 p-4">
              {navItems.map((item) => (
                <li
                key={item.id}
                className="flex items-center p-1 text-lg gap-x-2 text-foreground  hover:text-primary">
                  <Link href={item.href}
                  className={`${path === item.href ? 'active' : ''} flex items-center w-full hover:text-primary`}
                  prefetch={false}>
                      <p>
                      {item.name}
                      </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={`${path === item.href ? 'active' : ''} flex items-center p-1 text-lg gap-x-2 text-foreground hover:text-primary`}
                >
                  <Link href={item.href} className="flex items-center">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}