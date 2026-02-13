import { useEffect, useState } from "react";

interface RingExchangeAnimationProps {
  onComplete: () => void;
}

const RingExchangeAnimation = ({ onComplete }: RingExchangeAnimationProps) => {
  const [phase, setPhase] = useState<"entering" | "exchanging" | "complete">("entering");

  useEffect(() => {
    // Start exchange animation after entering
    const exchangeTimer = setTimeout(() => setPhase("exchanging"), 1000);
    // Complete after exchange
    const completeTimer = setTimeout(() => {
      setPhase("complete");
      setTimeout(() => onComplete(), 500);
    }, 3000);

    return () => {
      clearTimeout(exchangeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Girl (left side) */}
      <div 
        className="absolute left-1/4 flex flex-col items-center transition-all duration-1000"
        style={{
          transform: phase === "exchanging" ? "translateX(20%)" : "translateX(0)",
          opacity: phase === "entering" ? 0 : 1
        }}
      >
        <div className="text-6xl md:text-8xl mb-4">👨</div>
        <div 
          className="text-3xl md:text-5xl transition-all duration-1000"
          style={{
            transform: phase === "exchanging" ? "translateX(100px) translateY(-20px) rotate(15deg)" : "translateX(0) translateY(0) rotate(0deg)",
            opacity: phase === "exchanging" ? 0.3 : 1
          }}
        >
          💍
        </div>
        <div className="text-white text-sm md:text-base mt-4 font-serif">Asad</div>
      </div>

      {/* Boy (right side) */}
      <div 
        className="absolute right-1/4 flex flex-col items-center transition-all duration-1000"
        style={{
          transform: phase === "exchanging" ? "translateX(-20%)" : "translateX(0)",
          opacity: phase === "entering" ? 0 : 1
        }}
      >
        <div className="text-6xl md:text-8xl mb-4">👩</div>
        <div 
          className="text-3xl md:text-5xl transition-all duration-1000"
          style={{
            transform: phase === "exchanging" ? "translateX(-100px) translateY(-20px) rotate(-15deg)" : "translateX(0) translateY(0) rotate(0deg)",
            opacity: phase === "exchanging" ? 0.3 : 1
          }}
        >
          💍
        </div>
        <div className="text-white text-sm md:text-base mt-4 font-serif">Pranathee</div>
      </div>

      {/* Exchanged rings in center */}
      {phase === "exchanging" && (
        <>
          <div 
            className="absolute left-1/2 flex flex-col items-center transition-all duration-1000"
            style={{
              transform: "translateX(-60px) translateY(-20px)",
              animation: "ringGlow 1s ease-in-out infinite"
            }}
          >
            <div className="text-4xl md:text-6xl">💍</div>
          </div>
          <div 
            className="absolute left-1/2 flex flex-col items-center transition-all duration-1000"
            style={{
              transform: "translateX(60px) translateY(-20px)",
              animation: "ringGlow 1s ease-in-out infinite 0.5s"
            }}
          >
            <div className="text-4xl md:text-6xl">💍</div>
          </div>
        </>
      )}

      {/* Heart particles */}
      {phase === "exchanging" && (
        <>
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const radius = 120;
            const moveX = Math.cos(angle) * radius * 1.5;
            const moveY = Math.sin(angle) * radius * 1.5;
            return (
              <div
                key={i}
                className="absolute text-2xl md:text-3xl"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: `heartFloat${i} 2s ease-out forwards ${i * 0.1}s`,
                  opacity: 0
                }}
              >
                <style>{`
                  @keyframes heartFloat${i} {
                    0% {
                      opacity: 1;
                      transform: translate(-50%, -50%) scale(0.5);
                    }
                    100% {
                      opacity: 0;
                      transform: translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(1.5);
                    }
                  }
                `}</style>
                ❤️
              </div>
            );
          })}
        </>
      )}

      <style>{`
        @keyframes ringGlow {
          0%, 100% {
            transform: translateX(-60px) translateY(-20px) scale(1);
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
          }
          50% {
            transform: translateX(-60px) translateY(-20px) scale(1.2);
            filter: drop-shadow(0 0 20px rgba(255, 215, 0, 1));
          }
        }
      `}</style>
    </div>
  );
};

export default RingExchangeAnimation;
