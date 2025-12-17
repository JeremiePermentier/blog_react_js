import { useState, useEffect } from "react";
import type { Breakpoint } from "../types/Breakpoint";

const getBreakpoint = (): Breakpoint => {
    const width = window.innerWidth;
    if (width < 640) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window === "undefined" ? "desktop" : getBreakpoint()
  );

  useEffect(() => {
    const onResize = () => setBreakpoint(getBreakpoint());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return breakpoint;
};