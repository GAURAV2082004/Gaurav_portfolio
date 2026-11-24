"use client";

import React from "react";

interface TypedProps {
  children: string | React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Typed({ children, className = "", as: Component = "span" }: TypedProps) {
  // If string, break characters into individual span elements
  if (typeof children === "string") {
    return (
      <Component className={`typed-container ${className}`}>
        {Array.from(children).map((char, index) => {
          if (/\s/.test(char)) {
            return <React.Fragment key={index}> </React.Fragment>;
          }
          return (
            <span key={index} className="ch" data-typed-char="true">
              {char}
            </span>
          );
        })}
      </Component>
    );
  }

  // If node has nested text or highlights
  return <Component className={`typed-container ${className}`}>{children}</Component>;
}
