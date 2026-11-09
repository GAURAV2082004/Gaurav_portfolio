"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface DraggableWindowProps {
  title: string;
  badge?: string;
  children: ReactNode;
  className?: string;
  defaultPosition?: { x: number; y: number };
}

export default function DraggableWindow({
  title,
  badge = "INTERACTIVE // DRAGGABLE",
  children,
  className = "",
  defaultPosition = { x: 0, y: 0 },
}: DraggableWindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag from header handle
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: position.x,
      startY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      setPosition({
        x: dragStartRef.current.startX + dx,
        y: dragStartRef.current.startY + dy,
      });
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={`cyber-panel rounded-2xl overflow-hidden corner-bracket border border-[#ff3333]/30 transition-shadow duration-300 ${
        isDragging ? "shadow-[0_20px_50px_rgba(255,51,51,0.25)] ring-1 ring-[#ff3333]/50 cursor-grabbing" : "shadow-2xl"
      } ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Draggable Window Header Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a]/95 border-b border-[#ff3333]/20 font-mono text-xs cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-gray-200 font-bold ml-1 flex items-center gap-1.5">
            <span className="text-[#ff3333]">⋮⋮</span>
            <span>{title}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {position.x !== 0 || position.y !== 0 ? (
            <button
              type="button"
              onClick={resetPosition}
              className="text-[9px] text-gray-400 hover:text-white px-1.5 py-0.5 rounded border border-gray-800 bg-gray-900 transition-colors"
              title="Reset window position"
            >
              ↺ RESET
            </button>
          ) : null}

          <span className="text-[10px] text-[#ff4d4d] font-bold bg-[#ff3333]/10 border border-[#ff3333]/30 px-2 py-0.5 rounded hidden sm:inline">
            {badge}
          </span>

          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white px-1 text-xs"
          >
            {isMinimized ? "□" : "—"}
          </button>
        </div>
      </div>

      {/* Window Body */}
      {!isMinimized && children}
    </div>
  );
}
