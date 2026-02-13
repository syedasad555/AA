import { useState } from "react";

interface MemoryBoxesProps {
  onNext: () => void;
}

const memories = [
  { title: "The First Time", content: "The very first my heart started beating fastly when i saw you entering bus in school...You ran quickly towards bus that smile and that beauty!!I can say that in first fell in love with you by your Beauty" },
  { title: "That One Laugh", content: "E when you sit infront of my seat and laugh wahhh..I felt like i can live for the life with this laugh...Really i made me blush in the bus!!" },
  { title: "The Bus Moments", content: "The kind of fights we had in bus are the bestest memories...Beating with legs...Pushing with hands...Saying bye when the stop has came...These memories are like my 7 minutes memories." },
  { title: "The Fights", content: "No matter how many fights we had and how many misunderstandings we had, the never giveupness is the key to our relationship." },
  { title: "The kiddo Thing", content: "I always see you like my baby girl...like a small sweet cutie papa...you actually do like that only thats your childish behaviour with me make me fall more and more deeper in your love!!" },
  { title: "Us Always", content: "Every second with you is a memory i want to keep forever...we are going to be together for the rest of our lives...and I will never leave your hand" },
];

const MemoryBoxes = ({ onNext }: MemoryBoxesProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div 
      className="fixed inset-0 animate-page-in flex flex-col items-center justify-center px-6 py-12"
      onClick={() => setOpenIndex(null)}
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
      <div className="w-full max-w-6xl relative">
        {/* Memory boxes grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-10 mb-24">
          {memories.map((memory, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className="animate-fade-up"
                style={{ 
                  animationDelay: `${index * 0.1}s`, 
                  animationFillMode: "both"
                }}
              >
                <div 
                  className={`bg-gradient-to-br from-white/90 to-love-warm/70 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-love-blush/40 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer ${
                    isOpen 
                      ? 'rounded-3xl p-6 md:p-10 w-[90vw] md:w-[600px] max-w-full min-h-[250px] md:min-h-[300px]' 
                      : 'rounded-full w-40 h-40 md:w-52 md:h-52'
                  }`}
                  style={{
                    transform: isOpen ? 'scale(1.02)' : 'scale(1)',
                    zIndex: isOpen ? 50 : 10,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIndex(isOpen ? null : index);
                  }}
                >
                  {isOpen ? (
                    <div className="animate-box-open w-full">
                      <h3 className="text-xl md:text-2xl font-bold text-black tracking-wide mb-4 md:mb-6 font-serif capitalize text-center">
                        {memory.title}
                      </h3>
                      <p className="text-sm md:text-base font-medium text-black leading-relaxed font-serif text-center px-2 md:px-4">
                        {memory.content}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-love-blush/20 to-love-lavender/20 transition-all duration-300 rounded-full text-black font-bold text-sm md:text-base tracking-wider border-2 border-white/50 p-4">
                        <span className="text-center px-2 line-clamp-3">{memory.title}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Next Button */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-16">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="bg-gradient-to-r from-love-blush via-love-lavender to-love-blush text-black hover:from-love-lavender hover:via-love-blush hover:to-love-lavender transition-all duration-500 rounded-full px-12 py-5 text-lg font-black tracking-wider shadow-2xl hover:shadow-3xl transform hover:scale-110 border-2 border-white/50 font-serif animate-shimmer uppercase z-50 relative"
          >
            Next{" "}
            <span className="inline-block transition-transform group-hover:translate-x-2 font-black">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryBoxes;
