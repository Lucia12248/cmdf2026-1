import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trail {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const sparkles = ["✨", "⭐", "💫", "🌟", "✦"];

const MagicCursor = () => {
  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    let last = 0;
    const handle = (e: MouseEvent) => {
      const now = Date.now();
      if (now - last < 120) return;
      last = now;
      setTrails((prev) => [
        ...prev.slice(-8),
        {
          id: now,
          x: e.clientX,
          y: e.clientY,
          emoji: sparkles[Math.floor(Math.random() * sparkles.length)],
        },
      ]);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {trails.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 1, scale: 1, x: t.x - 8, y: t.y - 8 }}
            animate={{ opacity: 0, scale: 0, y: t.y - 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() =>
              setTrails((prev) => prev.filter((p) => p.id !== t.id))
            }
            className="absolute text-sm"
          >
            {t.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MagicCursor;
