"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { client } from "../../tina/__generated__/client";
import { NavigationItem } from "@/components/organisms/header/header.types";

interface NavigationContextType {
  navigation: NavigationItem[];
  isLoading: boolean;
  error: Error | null;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

const initialNavigation: NavigationItem[] = [];

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [navigation, setNavigation] =
    useState<NavigationItem[]>(initialNavigation);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.queries.global({
          relativePath: "Navigation_Data.yaml",
        });

        console.log(result);

        if (result.data?.global?.navigation?.mainNav) {
          const navItems = result.data.global.navigation.mainNav
            .filter(Boolean)
            .map((item) => ({
              label: item?.label || "",
              href: item?.href || "",
              subItems:
                item?.subItems?.filter(Boolean).map((subItem) => ({
                  label: subItem?.label || "",
                  href: subItem?.href || "",
                  icon: subItem?.icon || undefined,
                })) || [],
            }));

          setNavigation(navItems);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        navigation,
        isLoading,
        error,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
