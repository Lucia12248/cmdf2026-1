import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const EyeFollower = ({ cx, cy, pupilR = 7, eyeR = 14 }: { cx: number; cy: number; pupilR?: number; eyeR?: number }) => {
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const eyeRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const dist = Math.min(eyeR * 0.4, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) * 0.02);
      setPupil({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [eyeR]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <g>
      <circle ref={eyeRef} cx={cx} cy={cy} r={eyeR} fill="white" stroke="hsl(264 50% 76%)" strokeWidth="2" />
      {blink ? (
        <line x1={cx - eyeR * 0.6} y1={cy} x2={cx + eyeR * 0.6} y2={cy} stroke="hsl(264 45% 33%)" strokeWidth="2.5" strokeLinecap="round" />
      ) : (
        <>
          <circle cx={cx + pupil.x} cy={cy + pupil.y} r={pupilR} fill="hsl(264 45% 33%)" />
          <circle cx={cx + pupil.x + pupilR * 0.3} cy={cy + pupil.y - pupilR * 0.3} r={pupilR * 0.35} fill="white" />
        </>
      )}
    </g>
  );
};

interface InteractiveBunnyProps {
  size?: number;
  showBaby?: boolean;
  className?: string;
}

const InteractiveBunny = ({ size = 100, showBaby = false, className = "" }: InteractiveBunnyProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className={`relative inline-flex items-end gap-0 ${className}`}
    >
      {/* Main bunny */}
      <motion.div
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.6 }}
      >
        <svg width={size} height={size} viewBox="0 0 120 120">
          {/* Ears */}
          <motion.ellipse
            cx="40" cy="20" rx="14" ry="30"
            fill="hsl(336 60% 93%)" stroke="hsl(336 55% 75%)" strokeWidth="2"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "40px 50px" }}
          />
          <motion.ellipse
            cx="80" cy="20" rx="14" ry="30"
            fill="hsl(336 60% 93%)" stroke="hsl(336 55% 75%)" strokeWidth="2"
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ transformOrigin: "80px 50px" }}
          />
          <ellipse cx="40" cy="18" rx="8" ry="20" fill="hsl(336 55% 85%)" />
          <ellipse cx="80" cy="18" rx="8" ry="20" fill="hsl(336 55% 85%)" />
          {/* Head */}
          <circle cx="60" cy="70" r="38" fill="hsl(260 30% 98%)" stroke="hsl(264 50% 76%)" strokeWidth="2.5" />
          <EyeFollower cx={47} cy={64} />
          <EyeFollower cx={73} cy={64} />
          {/* Nose */}
          <motion.ellipse
            cx="60" cy="78" rx="4" ry="3"
            fill="hsl(336 55% 75%)"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Mouth */}
          <path d="M54 82 Q60 88 66 82" fill="none" stroke="hsl(264 50% 71%)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cheeks */}
          <motion.circle cx="38" cy="76" r="6" fill="hsl(336 60% 93%)" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.circle cx="82" cy="76" r="6" fill="hsl(336 60% 93%)" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
          {/* Sparkles */}
          <motion.text x="15" y="45" fontSize="10" animate={{ opacity: [0, 1, 0], y: [45, 38, 45] }} transition={{ duration: 2, repeat: Infinity }}>✨</motion.text>
          <motion.text x="95" y="50" fontSize="10" animate={{ opacity: [0, 1, 0], y: [50, 43, 50] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}>⭐</motion.text>
        </svg>
      </motion.div>

      {/* Baby bunny */}
      {showBaby && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          className="relative -ml-3"
          style={{ marginBottom: size * 0.05 }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 80 80">
              {/* Baby ears */}
              <motion.ellipse
                cx="28" cy="14" rx="9" ry="20"
                fill="hsl(336 60% 93%)" stroke="hsl(336 55% 75%)" strokeWidth="1.5"
                animate={{ rotate: [-4, 4, -4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "28px 34px" }}
              />
              <motion.ellipse
                cx="52" cy="14" rx="9" ry="20"
                fill="hsl(336 60% 93%)" stroke="hsl(336 55% 75%)" strokeWidth="1.5"
                animate={{ rotate: [4, -4, 4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                style={{ transformOrigin: "52px 34px" }}
              />
              <ellipse cx="28" cy="12" rx="5" ry="13" fill="hsl(336 55% 85%)" />
              <ellipse cx="52" cy="12" rx="5" ry="13" fill="hsl(336 55% 85%)" />
              {/* Baby head */}
              <circle cx="40" cy="48" r="26" fill="hsl(260 30% 98%)" stroke="hsl(264 50% 76%)" strokeWidth="2" />
              <EyeFollower cx={32} cy={44} pupilR={5} eyeR={10} />
              <EyeFollower cx={48} cy={44} pupilR={5} eyeR={10} />
              {/* Baby nose */}
              <motion.ellipse
                cx="40" cy="53" rx="3" ry="2.5"
                fill="hsl(336 55% 80%)"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              {/* Baby mouth - smile */}
              <path d="M35 56 Q40 61 45 56" fill="none" stroke="hsl(264 50% 71%)" strokeWidth="1.2" strokeLinecap="round" />
              {/* Baby cheeks */}
              <motion.circle cx="26" cy="52" r="4" fill="hsl(336 60% 93%)" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }} />
              <motion.circle cx="54" cy="52" r="4" fill="hsl(336 60% 93%)" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.2 }} />
              {/* Baby sparkle */}
              <motion.text x="58" y="30" fontSize="8" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>💫</motion.text>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InteractiveBunny;
