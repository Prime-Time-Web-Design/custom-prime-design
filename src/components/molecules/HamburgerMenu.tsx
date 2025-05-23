"use client";
import React, { useState, ReactNode, useEffect } from "react";
import "../../styles/hamburger.css"; // Import the CSS file

interface HamburgerMenuProps {
  children: ReactNode;
}

function HamburgerMenu({ children }: HamburgerMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Try to find the header element (assumes <header> is used)
    function updateHeaderHeight() {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.getBoundingClientRect().height);
      }
    }
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <label className="hamburger-menu cursor-pointer">
        <input type="checkbox" checked={isOpen} onChange={handleToggle} />
      </label>
      <aside
        className={`sidebar${isOpen ? " open" : ""}`}
        style={{
          top: headerHeight,
          height: `calc(100vh - ${headerHeight}px)`,
          background: "var(--color-bg)", // Ensure solid background
        }}
      >
        <nav className="w-full h-full overflow-y-auto flex flex-col justify-start items-stretch px-6 py-8">
          {children}
        </nav>
      </aside>
    </div>
  );
}

export default HamburgerMenu;
