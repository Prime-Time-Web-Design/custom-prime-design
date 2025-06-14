"use client";
import React, { useState, ReactNode, useEffect, createContext } from "react";
import "../../styles/hamburger.css"; // Import the CSS file

// Create a context for the menu functions
export const MenuContext = createContext<{
  closeMenu: () => void;
}>({
  closeMenu: () => {}, // Default no-op function
});

interface HamburgerMenuProps {
  children: ReactNode;
  // Optional callback to receive state updates from the parent
  onOpenChange?: (isOpen: boolean) => void;
}

function HamburgerMenu({
  children,
  onOpenChange,
}: HamburgerMenuProps): JSX.Element {
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

  // Update the state and call the callback if provided
  const handleToggle = (): void => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onOpenChange) {
      onOpenChange(newState);
    }
  };

  // Create the close menu function
  const closeMenu = () => {
    setIsOpen(false);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <MenuContext.Provider value={{ closeMenu }}>
      <div className="relative">
        <label className="hamburger-menu cursor-pointer">
          <input type="checkbox" checked={isOpen} onChange={handleToggle} />
        </label>
        <aside
          className={`sidebar${isOpen ? " open" : ""}`}
          style={{
            top: headerHeight,
            height: `calc(100vh - ${headerHeight}px)`,
            background: "var(--color-bg-contrast)", // Dark background like in the screenshot
          }}
        >
          <nav className="w-full h-full overflow-y-auto flex flex-col justify-between items-stretch">
            <div className="flex-1">{children}</div>
          </nav>
        </aside>
      </div>
    </MenuContext.Provider>
  );
}

export default HamburgerMenu;
