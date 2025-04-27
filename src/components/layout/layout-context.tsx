"use client";
import React, { useState, useContext, createContext } from "react";
import { GlobalQuery } from "../../../tina/__generated__/types";

interface LayoutState {
  globalSettings: GlobalQuery["global"];
  setGlobalSettings: React.Dispatch<
    React.SetStateAction<GlobalQuery["global"]>
  >;
  pageData: unknown;
  setPageData: React.Dispatch<React.SetStateAction<unknown>>;
}

const LayoutContext = createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      globalSettings: undefined,
      pageData: undefined,
      setGlobalSettings: () => {},
      setPageData: () => {},
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings: GlobalQuery["global"];
  pageData: unknown;
}

export const LayoutProvider = ({
  children,
  globalSettings: initialGlobalSettings,
  pageData: initialPageData,
}: LayoutProviderProps) => {
  const [globalSettings, setGlobalSettings] = useState<GlobalQuery["global"]>(
    initialGlobalSettings
  );
  const [pageData, setPageData] = useState<unknown>(initialPageData);

  return (
    <LayoutContext.Provider
      value={{ globalSettings, setGlobalSettings, pageData, setPageData }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
