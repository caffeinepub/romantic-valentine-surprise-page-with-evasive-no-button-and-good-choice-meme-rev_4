import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ConfettiOverlay } from '@/components/ConfettiOverlay';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [evasionCount, setEvasionCount] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current || evasionCount >= 100) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe bounds (keep button fully visible)
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 40;

    // Generate random position within bounds
    const newX = Math.max(0, Math.min(Math.random() * maxX, maxX));
    const newY = Math.max(0, Math.min(Math.random() * maxY, maxY));

    setNoButtonPosition({ x: newX, y: newY });
    setEvasionCount(prev => prev + 1);
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    setAccepted(true);
    
    // Stop confetti after animation completes
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  const handleNoHover = () => {
    if (evasionCount < 100) {
      setIsWiggling(true);
      setTimeout(() => {
        setIsWiggling(false);
        moveNoButton();
      }, 300);
    }
  };

  const handleNoPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    if (evasionCount < 100) {
      setIsWiggling(true);
      setTimeout(() => {
        setIsWiggling(false);
        moveNoButton();
      }, 200);
    }
  };

  // Initialize no button position on mount
  useEffect(() => {
    if (containerRef.current && noButtonRef.current && !accepted) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      const maxX = container.width - button.width - 40;
      const maxY = container.height - button.height - 40;
      setNoButtonPosition({ x: maxX / 2 + 100, y: maxY / 2 });
    }
  }, [accepted]);

  if (accepted) {
    return (
      <>
        {showConfetti && <ConfettiOverlay />}
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 dark:from-rose-950 dark:via-pink-950 dark:to-red-950 p-4">
          <div className="max-w-3xl w-full text-center space-y-8 animate-in fade-in duration-700">
            <div className="space-y-4">
              <Heart className="w-20 h-20 mx-auto text-rose-600 dark:text-rose-400 animate-pulse" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-rose-900 dark:text-rose-100">
                Yay Ginjo will be so happy ❤️
              </h1>
            </div>
            
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-300 dark:border-rose-700 max-w-2xl mx-auto">
              <img 
                src="/assets/generated/cats-kissing.dim_800x800.gif" 
                alt="Two cats kissing"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 dark:from-rose-950 dark:via-pink-950 dark:to-red-950 p-4">
      <div className="max-w-2xl w-full text-center space-y-12 animate-in fade-in duration-500">
        <div className="space-y-6">
          <Heart className="w-24 h-24 mx-auto text-rose-600 dark:text-rose-400 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold text-rose-900 dark:text-rose-100 leading-tight">
            Athira K M,
            <br />
            will you be my Valentine?
          </h1>
        </div>

        <div 
          ref={containerRef}
          className="relative min-h-[200px] flex items-center justify-center"
        >
          <Button
            size="lg"
            onClick={handleYesClick}
            className="yes-button-animated text-xl px-12 py-8 bg-rose-600 hover:bg-rose-700 text-white shadow-xl hover:shadow-2xl rounded-2xl"
          >
            Yes ❤️
          </Button>

          <button
            ref={noButtonRef}
            onMouseEnter={handleNoHover}
            onPointerDown={handleNoPointerDown}
            disabled={evasionCount >= 100}
            style={{
              position: 'absolute',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              opacity: evasionCount >= 100 ? 0.3 : 1,
              cursor: evasionCount >= 100 ? 'not-allowed' : 'pointer',
            }}
            className={`text-xl px-12 py-8 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 shadow-lg rounded-2xl font-medium touch-none disabled:hover:bg-gray-300 dark:disabled:hover:bg-gray-700 ${
              isWiggling ? 'animate-wiggle-bounce' : 'animate-playful-move'
            }`}
          >
            No 💔
          </button>
        </div>

        <p className="text-rose-700 dark:text-rose-300 text-lg italic">
          Choose wisely... 💘
        </p>
      </div>
    </div>
  );
}
