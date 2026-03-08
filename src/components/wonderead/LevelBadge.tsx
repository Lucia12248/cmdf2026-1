import { motion } from "framer-motion";

interface LevelBadgeProps {
  level: number;
  xp: number;
  maxXp: number;
  title: string;
}

const LevelBadge = ({ level, xp, maxXp, title }: LevelBadgeProps) => {
  const progress = (xp / maxXp) * 100;
  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
      className="flex items-center gap-3 bg-card rounded-2xl border border-lavender-mid/20 px-4 py-3 shadow-sm"
    >
      <div className="relative w-16 h-16 shrink-0">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--lavender))" strokeWidth="4" />
          <motion.circle
            cx="32" cy="32" r="28" fill="none"
            stroke="hsl(var(--lav-deep))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-lg font-black text-lavender-deep">{level}</span>
        </div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-text-soft font-semibold">Level {level}</div>
        <div className="font-display text-sm font-bold text-foreground">{title}</div>
        <div className="text-[10px] text-text-soft">{xp}/{maxXp} XP</div>
      </div>
    </motion.div>
  );
};

export default LevelBadge;
