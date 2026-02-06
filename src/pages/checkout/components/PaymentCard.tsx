"use client";

import type { ReactNode } from "react";

interface PaymentCardProps {
  children: ReactNode;
}

export function PaymentCard({ children }: PaymentCardProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glassmorphism card */}
      <div
        className="relative rounded-2xl border p-8 sm:p-10 text-center"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          borderColor: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 48px -12px rgba(0,0,0,0.4)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
