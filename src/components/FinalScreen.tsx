import { useEffect, useState } from "react";

const loveSymbols = ["❤️", "💕", "💖", "💗", "💓", "💝", "💘", "💞", "💟", "🥰", "😍", "💋", "🌹", "✨", "💫"];

interface FinalScreenProps {
  onBack: () => void;
}

const FinalScreen = ({ onBack }: FinalScreenProps) => {
  const fullText = "Love You So Muchhh Buddi😘!!";
  const [displayed, setDisplayed] = useState("");
  const [showSignature, setShowSignature] = useState(false);
  const [symbols, setSymbols] = useState<Array<{ id: number; symbol: string; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayed(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSignature(true), 600);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Generate falling symbols continuously
  useEffect(() => {
    const generateSymbol = () => {
      const newSymbol = {
        id: Date.now() + Math.random(),
        symbol: loveSymbols[Math.floor(Math.random() * loveSymbols.length)],
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 4 // 3-7 seconds
      };
      setSymbols(prev => [...prev, newSymbol]);
    };

    // Generate initial symbols
    for (let i = 0; i < 15; i++) {
      setTimeout(() => generateSymbol(), i * 200);
    }

    // Continuously generate new symbols
    const symbolInterval = setInterval(() => {
      generateSymbol();
    }, 500);

    // Clean up old symbols (remove after they fall)
    const cleanupInterval = setInterval(() => {
      setSymbols(prev => prev.slice(-30)); // Keep only last 30 symbols
    }, 2000);

    return () => {
      clearInterval(symbolInterval);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 animate-page-in flex items-center justify-center px-6 py-12 overflow-hidden"
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
        @keyframes fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      {/* Falling Love Symbols */}
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className="fixed top-0 text-2xl md:text-4xl pointer-events-none z-0"
          style={{
            left: `${symbol.left}%`,
            animation: `fall ${symbol.duration}s linear ${symbol.delay}s forwards`,
            transform: 'translateY(-100%)'
          }}
        >
          {symbol.symbol}
        </div>
      ))}
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 hover:border-white/40 transition-all duration-300 rounded-full px-6 py-3 text-sm font-medium tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 z-50"
      >
        ← Back
      </button>
      
      <div className="relative z-10 text-center">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-love-blush/30 max-w-2xl mx-auto">
          <p className="text-3xl md:text-5xl font-black text-black font-handwritten tracking-wide text-center">
            {displayed}
            <span
              className="inline-block w-[3px] h-10 ml-3 border-r-4 border-love-blush"
              style={{ animation: "typewriter-blink 1s step-end infinite" }}
            />
          </p>
        </div>
      </div>

      <div className={`fixed bottom-12 right-12 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-love-blush/30 transition-all duration-1000 ${
        showSignature ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}>
        <p className="text-lg font-bold text-black font-handwritten">
          ~ Asad
        </p>
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FinalScreen;
