import { useState } from 'react';

const DEFAULT_IMAGES = [
  { src: '/images/memory1.jpeg', alt: 'Memory 1' },
  { src: '/images/memory2.jpeg', alt: 'Memory 2' },
  { src: '/images/memory3.jpeg', alt: 'Memory 3' },
  { src: '/images/memory4.jpeg', alt: 'Memory 4' },
  { src: '/images/memory5.jpeg', alt: 'Memory 5' },
  { src: '/images/memory6.jpeg', alt: 'Memory 6' },
  { src: '/images/memory7.jpeg', alt: 'Memory 7' },
  { src: '/images/memory8.jpeg', alt: 'Memory 8' },
  { src: '/images/memory9.jpeg', alt: 'Memory 9' },
  { src: '/images/memory10.jpeg', alt: 'Memory 10' },
  { src: '/images/memory11.jpeg', alt: 'Memory 11' },
  { src: '/images/memory12.jpeg', alt: 'Memory 12' },
  { src: '/images/memory13.jpeg', alt: 'Memory 13' },
  { src: '/images/memory14.jpeg', alt: 'Memory 14' },
  { src: '/images/memory15.jpeg', alt: 'Memory 15' },
  { src: '/images/memory16.jpeg', alt: 'Memory 16' },
  { src: '/images/memory17.jpeg', alt: 'Memory 17' },
  { src: '/images/memory18.jpeg', alt: 'Memory 18' },
  { src: '/images/memory19.jpeg', alt: 'Memory 19' },
  { src: '/images/memory20.jpeg', alt: 'Memory 20' },
  { src: '/images/memory21.jpeg', alt: 'Memory 21' },
  { src: '/images/memory22.jpeg', alt: 'Memory 22' },
  { src: '/images/memory23.jpeg', alt: 'Memory 23' },
  { src: '/images/memory24.jpeg', alt: 'Memory 24' },
  { src: '/images/memory25.jpeg', alt: 'Memory 25' },
  { src: '/images/memory26.jpeg', alt: 'Memory 26' },
  { src: '/images/memory27.jpeg', alt: 'Memory 27' },
  { src: '/images/memory28.jpeg', alt: 'Memory 28' },
  { src: '/images/memory29.jpeg', alt: 'Memory 29' },
  { src: '/images/memory30.jpeg', alt: 'Memory 30' },
  { src: '/images/memory31.jpeg', alt: 'Memory 31' },
  { src: '/images/memory32.jpeg', alt: 'Memory 32' },
  { src: '/images/memory33.jpeg', alt: 'Memory 33' },
  { src: '/images/memory34.jpeg', alt: 'Memory 34' },
  { src: '/images/memory35.jpeg', alt: 'Memory 35' },
  { src: '/images/memory36.jpeg', alt: 'Memory 36' },
  { src: '/images/memory37.jpeg', alt: 'Memory 37' },
  { src: '/images/memory38.jpeg', alt: 'Memory 38' },
  { src: '/images/memory39.jpeg', alt: 'Memory 39' },
  { src: '/images/memory40.jpeg', alt: 'Memory 40' }
];

interface CircularDomeGalleryProps {
  images?: any[];
  onNext?: () => void;
  onBack?: () => void;
}

export default function CircularDomeGallery({
  images = DEFAULT_IMAGES,
  onNext,
  onBack
}: CircularDomeGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Grid layout: 9 columns × 4 rows = 36 images
  const GRID_COLS = 9;
  const GRID_ROWS = 4;
  const MAX_TILES = GRID_COLS * GRID_ROWS;
  const tiles = images.slice(0, MAX_TILES);

  // Group images by rows
  const rows: any[][] = [];
  for (let i = 0; i < GRID_ROWS; i++) {
    rows.push(tiles.slice(i * GRID_COLS, (i + 1) * GRID_COLS));
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0a0a0a]">
      {/* Dark background */}
      <div className="pointer-events-none absolute inset-0 bg-[#0a0a0a]" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8 py-12">
        {rows.map((rowImages, rowIndex) => {
          // Rows 0 and 2 (1st and 3rd) scroll left, rows 1 and 3 (2nd and 4th) scroll right
          const scrollDirection = rowIndex % 2 === 0 ? 'left' : 'right';
          const animationName = scrollDirection === 'left' ? 'scroll-left' : 'scroll-right';
          
          return (
            <div
              key={rowIndex}
              className="flex gap-6 relative w-full overflow-hidden"
              style={{
                height: '180px',
                alignItems: 'center'
              }}
            >
              {/* Duplicate images for seamless infinite scroll */}
              <div
                className="flex gap-6"
                style={{
                  animation: hoveredIndex !== null && Math.floor(hoveredIndex / GRID_COLS) === rowIndex 
                    ? 'none' 
                    : `${animationName} 30s linear infinite`,
                  willChange: 'transform'
                }}
              >
                {/* First set */}
                {rowImages.map((image, colIndex) => {
                  const globalIndex = rowIndex * GRID_COLS + colIndex;
                  const isHovered = hoveredIndex === globalIndex;
                  
                  return (
                    <div
                      key={`first-${globalIndex}`}
                      className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/5 bg-black/10 transition-all duration-500 cursor-pointer"
                      style={{
                        width: isHovered ? '220px' : '140px',
                        height: isHovered ? '220px' : '140px',
                        transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                        zIndex: isHovered ? 50 : 10,
                        boxShadow: isHovered ? '0 25px 50px rgba(0, 0, 0, 0.8)' : '0 8px 16px rgba(0, 0, 0, 0.4)'
                      }}
                      onMouseEnter={() => setHoveredIndex(globalIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-full object-cover transition-all duration-500"
                        style={{
                          filter: isHovered ? 'brightness(1.1)' : 'none'
                        }}
                        loading="lazy"
                        draggable={false}
                        onError={(e) => {
                          console.error('Image failed to load:', image.src);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full bg-gray-800 flex items-center justify-center text-white text-xs">?</div>';
                          }
                        }}
                      />
                    </div>
                  );
                })}
                {/* Second set for seamless loop */}
                {rowImages.map((image, colIndex) => {
                  const globalIndex = rowIndex * GRID_COLS + colIndex;
                  const isHovered = hoveredIndex === globalIndex;
                  
                  return (
                    <div
                      key={`second-${globalIndex}`}
                      className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/5 bg-black/10 transition-all duration-500 cursor-pointer"
                      style={{
                        width: isHovered ? '220px' : '140px',
                        height: isHovered ? '220px' : '140px',
                        transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                        zIndex: isHovered ? 50 : 10,
                        boxShadow: isHovered ? '0 25px 50px rgba(0, 0, 0, 0.8)' : '0 8px 16px rgba(0, 0, 0, 0.4)'
                      }}
                      onMouseEnter={() => setHoveredIndex(globalIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-full object-cover transition-all duration-500"
                        style={{
                          filter: isHovered ? 'brightness(1.1)' : 'none'
                        }}
                        loading="lazy"
                        draggable={false}
                        onError={(e) => {
                          console.error('Image failed to load:', image.src);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full bg-gray-800 flex items-center justify-center text-white text-xs">?</div>';
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(calc(-100% / 2));
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
      
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-8 left-8 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 hover:border-white/40 transition-all duration-300 rounded-full px-8 py-4 text-lg font-medium tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 z-50"
        >
          ← Back
        </button>
      )}
      
      {/* Next Button */}
      {onNext && (
        <button
          onClick={onNext}
          className="fixed bottom-8 right-8 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 hover:border-white/40 transition-all duration-300 rounded-full px-8 py-4 text-lg font-medium tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 z-50"
        >
          Next →
        </button>
      )}
    </div>
  );
}
