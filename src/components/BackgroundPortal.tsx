import { createPortal } from "react-dom";
import { ReactNode } from "react";

export default function BackgroundPortal({ children }: { children: ReactNode }) {
  // We target the document body to ensure the background is at the root level, 
  // preventing stacking context issues with glassmorphism backdrop-filter.
  if (typeof document === "undefined") return null;
  
  return createPortal(
    <div 
      id="global-background-portal"
      className="fixed inset-0 pointer-events-none" 
      style={{ 
        zIndex: 10, // Strictly Layer 2
        backgroundColor: "transparent", 
        transition: "background-color 0.3s ease"
      }}
    >
      {children}
    </div>,
    document.body
  );
}
