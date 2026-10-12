import { useState, useEffect } from "react";

const QUERY = "(min-aspect-ratio: 4/3)";

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = (e) => setIsDesktop(e.matches);

    setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}