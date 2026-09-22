"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    // Only add click particle bursts, don't replace or lag the system cursor
    const onClick = (e: MouseEvent) => {
      // 8 small high-speed neon particles on click
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        const angle = (i / 8) * 360;
        const distance = 25 + Math.random() * 25;
        particle.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${i % 2 === 0 ? "#22d3ee" : "#818cf8"};
          box-shadow: 0 0 8px ${i % 2 === 0 ? "#22d3ee" : "#818cf8"};
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          animation: particle-burst 0.45s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
          --angle: ${angle}deg;
          --distance: ${distance}px;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 450);
      }
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return null;
}
