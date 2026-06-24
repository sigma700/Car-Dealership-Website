"use client";
import {useUI} from "@/context/UIContext";
import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("./Preloader"), {ssr: false});

export default function PreloaderWrapper() {
  const {isLoading, setLoading} = useUI();

  if (!isLoading) return null;

  return <Preloader onComplete={() => setLoading(false)} />;
}
