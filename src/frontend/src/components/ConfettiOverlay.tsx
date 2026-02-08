import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotation: number;
}

export function ConfettiOverlay() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    // Generate confetti pieces
    const pieces: ConfettiPiece[] = [];
    const colors = [
      'oklch(0.65 0.22 15)', // rose
      'oklch(0.75 0.18 350)', // pink
      'oklch(0.80 0.15 25)', // peach
      'oklch(0.70 0.20 340)', // magenta
      'oklch(0.85 0.10 15)', // light pink
    ];

    for (let i = 0; i < 80; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      });
    }

    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece absolute w-3 h-3 opacity-0"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
