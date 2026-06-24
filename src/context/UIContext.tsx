"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type CursorVariant = "default" | "link" | "image" | "canvas";

interface UIContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
}

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({children}: {children: ReactNode}) {
  const [isLoading, setLoading] = useState(true);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");

  return (
    <UIContext.Provider
      value={{isLoading, setLoading, cursorVariant, setCursorVariant}}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
