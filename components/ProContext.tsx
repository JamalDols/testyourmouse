"use client";

import React, { createContext, useContext } from "react";

interface ProContextType {
  isProUnlocked: boolean;
  unlockPro: () => void;
}

const ProContext = createContext<ProContextType | undefined>(undefined);

export function ProProvider({ children }: { children: React.ReactNode }) {
  // All features are free — always unlocked
  const unlockPro = () => {};

  return <ProContext.Provider value={{ isProUnlocked: true, unlockPro }}>{children}</ProContext.Provider>;
}

export function useProContext() {
  const context = useContext(ProContext);
  if (context === undefined) {
    throw new Error("useProContext must be used within a ProProvider");
  }
  return context;
}
