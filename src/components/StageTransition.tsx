import { useEffect, useState } from "react";

interface StageTransitionProps {
  text: string;
  onComplete: () => void;
}

const StageTransition = ({ text, onComplete }: StageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 100);
    
    // Hold for 2 seconds
    const holdTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);
    
    // Complete after fade out
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-500 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div 
        className={`text-white text-4xl md:text-6xl font-bold text-center px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          fontFamily: 'serif',
          letterSpacing: '0.1em'
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default StageTransition;
