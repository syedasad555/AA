import { useState, useRef } from "react";
import RingExchangeAnimation from "./RingExchangeAnimation";

interface ValentineQuestionProps {
  onYes: () => void;
  onBack: () => void;
}

const ValentineQuestion = ({ onYes, onBack }: ValentineQuestionProps) => {
  const [noText, setNoText] = useState("No");
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showRingAnimation, setShowRingAnimation] = useState(false);
  const idRef = useRef(0);

  const handleNoHover = () => {
    setNoText("Yes");
  };

  const handleNoLeave = () => {
    setNoText("No");
  };

  const handleButtonHover = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = idRef.current++;
    setFloatingTexts((prev) => [
      ...prev.slice(-4),
      { id, x: rect.left + rect.width / 2, y: rect.top },
    ]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((t) => t.id !== id));
    }, 1500);
  };

  const handleButtonClick = () => {
    setShowRingAnimation(true);
  };

  if (showRingAnimation) {
    return <RingExchangeAnimation onComplete={onYes} />;
  }

  return (
    <div 
      className="fixed inset-0 animate-page-in flex flex-col items-center justify-center px-6"
      style={{
        background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 25%, #ffb3d1 50%, #c8a2c8 75%, #b19cd9 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease infinite'
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 bg-gradient-to-r from-love-blush to-love-lavender text-black hover:from-love-lavender hover:to-love-blush transition-all duration-300 rounded-full px-6 py-3 text-sm font-bold tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white/50 animate-shimmer uppercase"
      >
        ← Back
      </button>

      <h2
        className="text-3xl md:text-5xl text-black font-handwritten mb-16 animate-fade-up font-bold"
        style={{ animationDelay: "0.2s", animationFillMode: "both" }}
      >
        Will You Be My Valentine❤️?
      </h2>

      <div
        className="flex gap-12 animate-fade-up"
        style={{ animationDelay: "0.6s", animationFillMode: "both" }}
      >
        <button
          onClick={handleButtonClick}
          onMouseEnter={handleButtonHover}
          className="text-xl font-bold font-serif lowercase tracking-wider text-black bg-gradient-to-r from-love-blush to-love-lavender hover:from-love-lavender hover:to-love-blush rounded-full px-12 py-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/50 animate-shimmer"
        >
          Yes
        </button>

        <button
          onMouseEnter={(e) => {
            handleNoHover();
            handleButtonHover(e);
          }}
          onMouseLeave={handleNoLeave}
          onClick={handleButtonClick}
          className="text-xl font-bold font-serif lowercase tracking-wider text-black bg-gradient-to-r from-love-blush to-love-lavender hover:from-love-lavender hover:to-love-blush rounded-full px-12 py-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/50 animate-shimmer"
        >
          {noText}
        </button>
      </div>

      {floatingTexts.map((ft) => (
        <span
          key={ft.id}
          className="fixed text-xs text-muted-foreground font-handwritten animate-float-up pointer-events-none"
          style={{
            left: ft.x,
            top: ft.y - 10,
            transform: "translateX(-50%)",
          }}
        >
          hehehe i know laa
        </span>
      ))}
    </div>
  );
};

export default ValentineQuestion;
