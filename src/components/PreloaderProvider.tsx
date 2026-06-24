"use client";

import {useState} from "react";
import {UIProvider} from "@/context/UIContext";
import Preloader from "@/components/Preloader";

export function PreloaderProvider({children}: {children: React.ReactNode}) {
  const [loading, setLoading] = useState(true);

  return (
    <UIProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div
        style={{visibility: loading ? "hidden" : "visible"}}
        className="min-h-screen"
      >
        {children}
      </div>
    </UIProvider>
  );
}
