"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [isRevealed, setIsRevealed] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Fast-mode or reduced motion: instant reveal
    if (cursorQueue.isFastMode) {
      setIsRevealed(true);
      return;
    }

    const uniqueId = id || `live-build-${Math.random().toString(36).slice(2, 9)}`;
    let fallbackTimer: NodeJS.Timeout | null = null;

    const revealBlock = () => {
      setIsRevealed(true);
      setIsWiping(true);
      setTimeout(() => setIsWiping(false), 900);
      // reveal any child typed characters if not already revealed
      el.querySelectorAll<HTMLElement>('[data-typed-char="true"]').forEach((ch) => {
        ch.classList.add("on");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(el);

            // Register with cursor queue
            cursorQueue.register({
              id: uniqueId,
              element: el,
              isGraphic,
              onStart: () => {
                setIsRevealed(true);
                if (isGraphic) {
                  setIsWiping(true);
                  setTimeout(() => setIsWiping(false), 900);
                }
              },
              onComplete: () => {
                revealBlock();
              },
            });

            // 9-second safety net timeout: never leave content hidden
            fallbackTimer = setTimeout(() => {
              revealBlock();
            }, 9000);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [id, isGraphic]);

  return (
    <Component
      ref={containerRef}
      className={`live-build-block ${isRevealed ? (isWiping ? "fillin" : "in") : "pre"} ${className}`}
      style={{
        transition: "opacity 0.4s ease",
        opacity: isRevealed ? 1 : 0,
      }}
    >
      {children}
    </Component>
  );
}
