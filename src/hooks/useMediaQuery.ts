import { useState, useEffect } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      // Set initial state
      listener();
      return () => media.removeEventListener("change", listener);
    }
  }, [query]);

  return matches;
};
