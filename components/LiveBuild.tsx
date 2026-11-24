"use client";

import React, { useEffect, useRef } from "react";
import { cursorQueue } from "@/lib/cursorQueue";

interface LiveBuildProps {
  children: React.ReactNode;
  id?: string;
  isGraphic?: boolean;
  className?: string;
  as?: React.ElementType;
}

export default function LiveBuild({
  children,
  id,
  isGraphic = false,
  className = "",
  as: Component = "div",
}: LiveBuildProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    cursorQueue.registerBlock(el, { id, isGraphic });
  }, [id, isGraphic]);

  return (
    <Component
      ref={containerRef}
      data-live-build={id || "block"}
      data-is-graphic={isGraphic ? "true" : undefined}
      className={`live-build-target pre ${className}`}
    >
      {children}
    </Component>
  );
}
