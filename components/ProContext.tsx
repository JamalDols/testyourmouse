"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ProContextType {
  isProUnlocked: boolean;
  unlockPro: () => void;
}

const ProContext = createContext<ProContextType | undefined>(undefined);

export function ProProvider({ children }: { children: React.ReactNode }) {
  const [isProUnlocked, setIsProUnlocked] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const proStatus = localStorage.getItem("testyourmouse_pro_unlocked");
    if (proStatus === "true") {
      setIsProUnlocked(true);
    }
  }, []);

  const unlockPro = () => {
    setIsProUnlocked(true);
    localStorage.setItem("testyourmouse_pro_unlocked", "true");
  };

  return <ProContext.Provider value={{ isProUnlocked, unlockPro }}>{children}</ProContext.Provider>;
}

export function useProContext() {
  const context = useContext(ProContext);
  if (context === undefined) {
    throw new Error("useProContext must be used within a ProProvider");
  }
  return context;
}
