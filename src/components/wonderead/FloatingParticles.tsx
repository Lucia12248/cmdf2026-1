import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  duration: number;
  delay: number;
}

const emojis = ["✨", "⭐", "🌟", "💫", "🦋", "🌸", "🍃", "💜", "🌈", "🎀"];

const FloatingParticles = ({ count = 15 }: { count?: number }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: 12 + Math.random() * 16,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 5,
      }))
    );
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            rotate: [0, 15, -15, 10, 0],
            opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
            scale: [0.8, 1.1, 0.9, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
