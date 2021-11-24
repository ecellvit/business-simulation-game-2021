import React, { createContext, useContext, useEffect, useState } from "react";

const ViewportContext = createContext({
  isMobile: window.innerWidth < 500,
  height: window.innerHeight,
  width: window.innerWidth,
});

export const ViewportProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 500);
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ isMobile, height, width }}>
      {children}
    </ViewportContext.Provider>
  );
};

export function useViewport() {
  return useContext(ViewportContext)
}