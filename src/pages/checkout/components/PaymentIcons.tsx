import { useEffect, useState } from "react";

export function AnimatedCheckmark() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      {/* Glow ring */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-700 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%)",
          transform: visible ? "scale(1.5)" : "scale(0)",
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Circle */}
      <div
        className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 transition-all duration-500 ease-out"
        style={{
          borderColor: visible ? "#4ade80" : "rgba(255,255,255,0.1)",
          backgroundColor: visible ? "rgba(74,222,128,0.1)" : "transparent",
          transform: visible ? "scale(1)" : "scale(0.8)",
          opacity: visible ? 1 : 0,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-10 h-10 transition-all duration-500 delay-300 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.5)",
          }}
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="#4ade80"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 24,
              strokeDashoffset: visible ? 0 : 24,
              transition: "stroke-dashoffset 0.6s ease-out 0.4s",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

export function AnimatedCross() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      {/* Glow ring */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-700 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(248,113,113,0.2) 0%, transparent 70%)",
          transform: visible ? "scale(1.5)" : "scale(0)",
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Circle */}
      <div
        className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 transition-all duration-500 ease-out"
        style={{
          borderColor: visible ? "#f87171" : "rgba(255,255,255,0.1)",
          backgroundColor: visible ? "rgba(248,113,113,0.1)" : "transparent",
          transform: visible ? "scale(1)" : "scale(0.8)",
          opacity: visible ? 1 : 0,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-10 h-10 transition-all duration-500 delay-300 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "scale(1) rotate(0deg)"
              : "scale(0.5) rotate(-90deg)",
          }}
        >
          <path
            d="M6 6l12 12"
            stroke="#f87171"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              strokeDasharray: 17,
              strokeDashoffset: visible ? 0 : 17,
              transition: "stroke-dashoffset 0.4s ease-out 0.4s",
            }}
          />
          <path
            d="M18 6L6 18"
            stroke="#f87171"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              strokeDasharray: 17,
              strokeDashoffset: visible ? 0 : 17,
              transition: "stroke-dashoffset 0.4s ease-out 0.6s",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

export function ProcessingSpinner() {
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(97,95,255,0.15) 0%, transparent 70%)",
          transform: "scale(1.5)",
        }}
      />
      {/* Spinner ring */}
      <svg className="w-20 h-20 animate-spin" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3"
        />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="#615fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="80 134"
        />
      </svg>
      {/* Inner pulsing dot */}
      <div
        className="absolute w-3 h-3 rounded-full animate-pulse"
        style={{ backgroundColor: "#615fff" }}
      />
    </div>
  );
}
