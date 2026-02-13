import { useState } from 'react';
import './SimpleDomeGallery.css';

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

interface SimpleDomeGalleryProps {
  images?: any[];
  onNext?: () => void;
}

export default function SimpleDomeGallery({
  images = DEFAULT_IMAGES,
  onNext
}: SimpleDomeGalleryProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      
      setRotation(prev => ({
        x: prev.x + deltaY * 0.3,
        y: prev.y + deltaX * 0.3
      }));
      
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="fixed inset-0 bg-dark-purple overflow-hidden cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          className="image-grid-container"
          style={{
            transform: `perspective(1500px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {images.map((image, i) => {
            const angle = (i / images.length) * Math.PI * 2;
            const x = Math.sin(angle) * 300;
            const z = Math.cos(angle) * 300;
            return (
              <div
                key={image.src}
                className="image-item"
                style={{
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${angle * (180 / Math.PI)}deg)`,
                }}
              >
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-lg grayscale" />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-sm rounded-lg p-4 max-w-xs">
        <p className="text-black text-sm font-serif">
          Drag to rotate gallery
          🖱️ Drag to rotate gallery
        </p>
      </div>
      
      {/* Next Button */}
      {onNext && (
        <button
          onClick={onNext}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-love-blush via-love-lavender to-love-blush text-black hover:from-love-lavender hover:via-love-blush hover:to-love-lavender transition-all duration-500 rounded-full px-8 py-4 text-lg font-black tracking-wider shadow-2xl hover:shadow-3xl transform hover:scale-110 border-2 border-white/50 font-serif animate-shimmer uppercase z-50"
        >
          Next{" "}
          <span className="inline-block transition-transform group-hover:translate-x-2 font-black">
            →
          </span>
        </button>
      )}
    </div>
  );
}
