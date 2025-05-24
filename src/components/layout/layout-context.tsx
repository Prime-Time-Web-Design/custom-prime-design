"use client";
import React, { useState, useContext, createContext } from "react";
import { GlobalSettings } from "@/lib/component-types";

interface LayoutState {
  globalSettings: GlobalSettings | undefined;
  setGlobalSettings: React.Dispatch<
    React.SetStateAction<GlobalSettings | undefined>
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
  globalSettings: GlobalSettings | undefined;
  pageData: unknown;
}

export const LayoutProvider = ({
  children,
  globalSettings: initialGlobalSettings,
  pageData: initialPageData,
}: LayoutProviderProps) => {
  const [globalSettings, setGlobalSettings] = useState<
    GlobalSettings | undefined
  >(initialGlobalSettings);
  const [pageData, setPageData] = useState<unknown>(initialPageData);

  return (
    <LayoutContext.Provider
      value={{ globalSettings, setGlobalSettings, pageData, setPageData }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
