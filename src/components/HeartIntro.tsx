import { useEffect, useState } from "react";

interface HeartIntroProps {
  onComplete: () => void;
}

const HeartIntro = ({ onComplete }: HeartIntroProps) => {
  const [phase, setPhase] = useState<"drawing" | "pulsing" | "fading">("drawing");

  useEffect(() => {
    const drawTimer = setTimeout(() => setPhase("pulsing"), 2600);
    const pulseTimer = setTimeout(() => setPhase("fading"), 4500);
    const fadeTimer = setTimeout(() => onComplete(), 5300);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(pulseTimer);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-love-blush via-love-cream to-love-lavender flex items-center justify-center transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Heading */}
      <div className="absolute top-12 text-center z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-pink-900 tracking-wider animate-pulse">
          For My Love!
        </h1>
      </div>
      <svg
        viewBox="0 0 200 200"
        className={`w-40 h-40 md:w-56 md:h-56 absolute top-1/2 left-1/2 ${
          phase === "pulsing" ? "animate-heart-pulse" : ""
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(350, 80%, 75%)">
              <animate
                attributeName="stop-color"
                values="hsl(350,80%,75%);hsl(300,60%,80%);hsl(20,80%,80%);hsl(350,80%,75%)"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="hsl(300, 60%, 80%)">
              <animate
                attributeName="stop-color"
                values="hsl(300,60%,80%);hsl(20,80%,80%);hsl(350,80%,75%);hsl(300,60%,80%)"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M100 180 C60 140, 10 120, 10 80 C10 50, 40 30, 70 30 C85 30, 95 40, 100 50 C105 40, 115 30, 130 30 C160 30, 190 50, 190 80 C190 120, 140 140, 100 180Z"
          stroke="url(#heartGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          className="animate-draw-heart"
        />
      </svg>
    </div>
  );
};

export default HeartIntro;
