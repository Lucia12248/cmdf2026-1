import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import aliceScene1Video from "@/assets/videos/alice-scene1.mp4";

const SLIDE_W = 1920;
const SLIDE_H = 1080;

/* ─── Slide wrapper with 1920×1080 scaling ─── */
const ScaledSlide = ({ children, containerRef }: { children: React.ReactNode; containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      setScale(Math.min(w / SLIDE_W, h / SLIDE_H));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [containerRef]);

  return (
    <div
      className="absolute slide-content"
      style={{
        width: SLIDE_W,
        height: SLIDE_H,
        left: "50%",
        top: "50%",
        marginLeft: -SLIDE_W / 2,
        marginTop: -SLIDE_H / 2,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};

/* ─── Stat card component ─── */
const StatCard = ({ stat, label, emoji, color }: { stat: string; label: string; emoji: string; color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className={`${color} rounded-[32px] p-10 flex flex-col items-center justify-center text-center`}
  >
    <span className="text-[56px] mb-2">{emoji}</span>
    <div className="text-[52px] font-black leading-tight text-[#2d1b4e]">{stat}</div>
    <div className="text-[22px] mt-2 text-[#5a3d7a] font-medium leading-snug">{label}</div>
  </motion.div>
);

/* ─── Feature row ─── */
const FeatureRow = ({ emoji, title, desc, delay = 0 }: { emoji: string; title: string; desc: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-start gap-8"
  >
    <span className="text-[64px] shrink-0 leading-none">{emoji}</span>
    <div>
      <div className="text-[36px] font-bold text-[#2d1b4e] leading-tight">{title}</div>
      <div className="text-[24px] text-[#6b5087] leading-relaxed mt-1">{desc}</div>
    </div>
  </motion.div>
);

/* ─── All slides ─── */
const slides = [
  // SLIDE 1: Title
  () => (
    <div className="w-full h-full bg-gradient-to-br from-[#f3eef8] via-[#faf8fc] to-[#edf7f3] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#e8dff5] blur-[120px] -top-40 -left-40 opacity-60" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#d5f0e8] blur-[100px] -bottom-32 -right-32 opacity-50" />
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.4 }} className="text-[120px] mb-6">
        🐇
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[96px] font-black text-[#2d1b4e] tracking-tight leading-none"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Wonder<span className="text-[#7c5cb8]">ead</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-[36px] text-[#6b5087] mt-6 font-medium"
      >
        Making reading magical for every child ✨
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-[#7c5cb8] text-white rounded-full px-14 py-5 text-[24px] font-bold shadow-[0_8px_30px_rgba(124,92,184,0.3)]"
      >
        CMDF 2026 — Hackathon Pitch
      </motion.div>
    </div>
  ),

  // SLIDE 2: The Problem
  () => (
    <div className="w-full h-full bg-gradient-to-br from-[#fdf2f4] via-[#faf8fc] to-[#f8f0f5] flex flex-col px-[120px] py-[80px] relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#fce0e8] blur-[100px] top-10 right-10 opacity-40" />
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-5 mb-12">
        <span className="text-[72px]">🚨</span>
        <h2 className="text-[72px] font-black text-[#2d1b4e] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Problem
        </h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[34px] text-[#6b5087] mb-14 leading-relaxed max-w-[1400px]"
      >
        Children are falling behind in reading — and traditional tools aren't keeping up with how kids learn today.
      </motion.p>
      <div className="grid grid-cols-2 gap-8 flex-1">
        <StatCard stat="130M" label="children can't read by age 10 (UNESCO)" emoji="📚" color="bg-[#f5e6f0]/80" />
        <StatCard stat="1 in 5" label="kids have ADHD or dyslexia making reading harder (CDC)" emoji="🧠" color="bg-[#e8dff5]/80" />
        <StatCard stat="< 65s" label="average attention span on a task (Microsoft Research)" emoji="⏱️" color="bg-[#fce0e8]/80" />
        <StatCard stat="72%" label="of parents don't know how to make reading fun (Scholastic)" emoji="😟" color="bg-[#d5f0e8]/80" />
      </div>
    </div>
  ),

  // SLIDE 3: Root Cause
  () => (
    <div className="w-full h-full bg-gradient-to-br from-[#f3eef8] via-[#faf8fc] to-[#f0f8f5] flex flex-col items-center justify-center px-[120px] relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#e8dff5] blur-[120px] bottom-0 left-0 opacity-40" />
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-[100px] mb-8">
        💔
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[64px] font-black text-[#2d1b4e] text-center leading-tight mb-10"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Kids associate reading with boredom,<br/>not adventure.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[32px] text-[#6b5087] text-center max-w-[1200px] leading-relaxed"
      >
        Screen time is up 50% post-pandemic, but it's all passive — TikTok, YouTube, games.<br/>
        Meanwhile, books sit untouched. <strong>The gap widens every year.</strong>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-14 flex gap-8"
      >
        {["📱 Passive Screen Time", "📖 Active Reading"].map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <div className={`h-[200px] w-[120px] rounded-2xl ${i === 0 ? "bg-gradient-to-t from-[#e85d75] to-[#f5a0b0]" : "bg-gradient-to-t from-[#c4c4c4] to-[#e0e0e0]"} flex items-end justify-center pb-4`}>
              <span className="text-white font-black text-[28px]">{i === 0 ? "↑ 50%" : "↓ 30%"}</span>
            </div>
            <span className="text-[20px] font-semibold text-[#5a3d7a]">{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  ),

  // SLIDE 4: Why We Chose This
  () => (
    <div className="w-full h-full bg-gradient-to-br from-[#edf7f3] via-[#faf8fc] to-[#f3eef8] flex flex-col px-[120px] py-[80px] relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#d5f0e8] blur-[120px] top-0 right-0 opacity-40" />
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-5 mb-10">
        <span className="text-[72px]">💡</span>
        <h2 className="text-[72px] font-black text-[#2d1b4e] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
          Why We Chose This
        </h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-[32px] text-[#6b5087] mb-12 max-w-[1400px] leading-relaxed"
      >
        This isn't just a hackathon project — it's personal.
      </motion.p>
      <div className="grid grid-cols-1 gap-8 flex-1">
        <FeatureRow emoji="👦" title="We Were That Kid" desc="Team members grew up struggling with reading or watching siblings fall behind. We know the frustration firsthand." delay={0.2} />
        <FeatureRow emoji="📉" title="A $40B Problem No One Is Solving Right" desc="EdTech is booming, but reading apps still feel like worksheets with a cartoon mascot. Kids deserve better." delay={0.35} />
        <FeatureRow emoji="🔬" title="Science-Backed, Not Guesswork" desc="Bionic reading, multi-sensory learning, and gamification are research-proven — we just packaged them beautifully." delay={0.5} />
        <FeatureRow emoji="⏰" title="The Window Is Closing" desc="If a child can't read proficiently by age 10, they're 4x more likely to drop out. Every year we wait costs millions of futures." delay={0.65} />
      </div>
    </div>
  ),

  // SLIDE 5: What Makes Us Different
  () => (
    <div className="w-full h-full bg-gradient-to-br from-[#f3eef8] via-[#faf8fc] to-[#fdf2f4] flex flex-col px-[120px] py-[80px] relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#fce0e8] blur-[100px] bottom-20 left-20 opacity-40" />
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-5 mb-14">
        <span className="text-[72px]">🏅</span>
        <h2 className="text-[72px] font-black text-[#2d1b4e] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
          What Makes Us Different
        </h2>
      </motion.div>
      <div className="grid grid-cols-3 gap-6 flex-1 content-start">
        {[
          { them: "Static text on screen", us: "AI narration + word tracking + scene videos", label: "Experience" },
          { them: "One-size-fits-all", us: "ADHD mode, night mode, adjustable speed", label: "Accessibility" },
          { them: "\"Your kid read 10 pages\"", us: "Comprehension scores, streak data, reading patterns", label: "Parent Insights" },
          { them: "Badge for finishing a book", us: "XP, levels, streaks, scene quizzes — like a game", label: "Engagement" },
          { them: "Generic robot voices", us: "ElevenLabs emotional AI narration per character", label: "Narration" },
          { them: "Clip art illustrations", us: "AI-generated watercolor scene animations", label: "Visuals" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className="bg-white/60 backdrop-blur-sm rounded-[24px] p-7 border border-[#e8dff5]"
          >
            <div className="text-[22px] font-black text-[#7c5cb8] uppercase tracking-wide mb-4">{item.label}</div>
            <div className="flex items-start gap-3 mb-3">
              <span className="text-[20px] mt-0.5">❌</span>
              <span className="text-[22px] text-[#999] line-through leading-snug">{item.them}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[20px] mt-0.5">✅</span>
              <span className="text-[24px] font-bold text-[#2d1b4e] leading-snug">{item.us}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  ),

  // SLIDE 6: Our Solution
  () => (
    <div className="w-full h-full bg-gradient-to-br from-[#f3eef8] via-[#faf8fc] to-[#edf7f3] flex flex-col px-[120px] py-[80px] relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#d5f0e8] blur-[120px] -bottom-40 -right-40 opacity-50" />
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-5 mb-10">
        <span className="text-[72px]">✨</span>
        <h2 className="text-[72px] font-black text-[#2d1b4e] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
          Meet Wonderead
        </h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-[32px] text-[#6b5087] mb-12 max-w-[1400px] leading-relaxed"
      >
        An immersive reading platform that turns stories into game-like adventures —<br/>designed for how kids' brains actually work.
      </motion.p>
      <div className="grid grid-cols-2 gap-x-16 gap-y-10 flex-1">
        <FeatureRow emoji="🧠" title="Bionic Text (ADHD Mode)" desc="Bold-splits words for natural eye anchoring. Improves reading speed 20%." delay={0.2} />
        <FeatureRow emoji="👁️" title="Word-by-Word Tracking" desc="Gentle highlight follows along at adjustable speeds to prevent line-skipping." delay={0.3} />
        <FeatureRow emoji="🔊" title="AI Narration" desc="Natural, expressive read-aloud via ElevenLabs. Hearing + seeing = 25% better comprehension." delay={0.4} />
        <FeatureRow emoji="🎬" title="Scene Animations" desc="Watercolor-style videos for every scene — stories feel like movies, not homework." delay={0.5} />
      </div>
    </div>
  ),

  // SLIDE 5: More Features
  () => (
    <div className="w-full h-full bg-gradient-to-br from-[#edf7f3] via-[#faf8fc] to-[#f3eef8] flex flex-col px-[120px] py-[80px] relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#e8dff5] blur-[100px] top-20 left-20 opacity-40" />
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-5 mb-10">
        <span className="text-[72px]">🎮</span>
        <h2 className="text-[72px] font-black text-[#2d1b4e] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
          Engagement + Insights
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 gap-x-16 gap-y-10 flex-1">
        <FeatureRow emoji="🌙" title="Night Reading Mode" desc="Reduced eye strain for bedtime — when 60% of kids actually read." delay={0.15} />
        <FeatureRow emoji="📖" title="Tap-to-Learn Dictionary" desc="Tap any highlighted word for a kid-friendly definition. No breaking flow." delay={0.25} />
        <FeatureRow emoji="🏆" title="Gamification" desc="XP, streaks, level badges, scene quizzes. Reading progress becomes a game." delay={0.35} />
        <FeatureRow emoji="📊" title="Parent Dashboard" desc="Reading stats, comprehension scores, and streak tracking at a glance." delay={0.45} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-auto pt-8 flex items-center gap-4"
      >
        <div className="h-[6px] flex-1 rounded-full bg-gradient-to-r from-[#7c5cb8] via-[#3a9e7e] to-[#7c5cb8] opacity-30" />
        <span className="text-[22px] text-[#6b5087] italic">Every feature designed with accessibility in mind</span>
        <div className="h-[6px] flex-1 rounded-full bg-gradient-to-r from-[#7c5cb8] via-[#3a9e7e] to-[#7c5cb8] opacity-30" />
      </motion.div>
    </div>
  ),

  // SLIDE 6: Demo Screenshots
  () => (
    <div className="w-full h-full bg-gradient-to-br from-[#f3eef8] via-[#faf8fc] to-[#edf7f3] flex flex-col items-center justify-center px-[100px] relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#d5f0e8] blur-[120px] -top-40 right-0 opacity-40" />
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[64px] font-black text-[#2d1b4e] mb-10"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        📱 See It In Action
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-12 items-start"
      >
        {/* Live demo video */}
        <div className="flex flex-col items-center">
          <div className="w-[900px] h-[520px] rounded-[28px] overflow-hidden border-4 border-[#e8dff5] shadow-[0_20px_60px_rgba(124,92,184,0.25)] bg-[#1a1625] flex items-center justify-center relative">
            <video
              src={aliceScene1Video}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute top-4 left-4 bg-[#7c5cb8]/90 text-white rounded-full px-5 py-2 text-[18px] font-bold backdrop-blur-sm">
              🔴 Live Demo
            </div>
          </div>
          <div className="text-[26px] font-bold text-[#2d1b4e] mt-5">Immersive Story Reader</div>
          <div className="text-[18px] text-[#6b5087] mt-1">Bionic text · Word tracking · AI narration · Scene videos</div>
        </div>

        {/* Key metrics */}
        <div className="flex flex-col gap-6 mt-4">
          {[
            { num: "7", label: "Stories", emoji: "📚" },
            { num: "22", label: "Scene Videos", emoji: "🎬" },
            { num: "3", label: "Reading Modes", emoji: "🧠" },
            { num: "∞", label: "Adventures", emoji: "✨" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white/60 backdrop-blur-sm rounded-[20px] px-8 py-5 border border-[#e8dff5] flex items-center gap-5"
            >
              <span className="text-[40px]">{m.emoji}</span>
              <div>
                <div className="text-[36px] font-black text-[#2d1b4e] leading-none">{m.num}</div>
                <div className="text-[18px] text-[#6b5087]">{m.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  ),

  // SLIDE 7: Tech Stack
  () => (
    <div className="w-full h-full bg-gradient-to-br from-[#f3eef8] via-[#faf8fc] to-[#edf7f3] flex flex-col px-[120px] py-[80px] relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#e8dff5] blur-[100px] bottom-10 right-10 opacity-40" />
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-5 mb-14">
        <span className="text-[72px]">⚡</span>
        <h2 className="text-[72px] font-black text-[#2d1b4e] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
          Built With
        </h2>
      </motion.div>
      <div className="grid grid-cols-3 gap-10 flex-1 content-center">
        {[
          { emoji: "⚛️", name: "React + TypeScript", desc: "Modern, type-safe frontend" },
          { emoji: "🎨", name: "Tailwind + Framer Motion", desc: "Beautiful animations & responsive design" },
          { emoji: "☁️", name: "Lovable Cloud", desc: "Backend, auth & database" },
          { emoji: "🔊", name: "ElevenLabs AI", desc: "Natural text-to-speech narration" },
          { emoji: "🎬", name: "AI-Generated Videos", desc: "Watercolor scene animations" },
          { emoji: "🤖", name: "Lovable AI", desc: "Built entirely with AI assistance" },
        ].map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="bg-white/60 backdrop-blur-sm rounded-[28px] p-8 border border-[#e8dff5] flex flex-col items-center text-center"
          >
            <span className="text-[64px] mb-4">{tech.emoji}</span>
            <div className="text-[28px] font-bold text-[#2d1b4e]">{tech.name}</div>
            <div className="text-[20px] text-[#6b5087] mt-2">{tech.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  ),

  // SLIDE 8: One-Liner + CTA + Meme
  () => (
    <div className="w-full h-full bg-gradient-to-br from-[#f3eef8] via-[#faf8fc] to-[#edf7f3] flex relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#e8dff5] blur-[120px] -top-40 -right-40 opacity-50" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#d5f0e8] blur-[100px] -bottom-32 -left-32 opacity-40" />
      
      {/* Left side - quote + CTA */}
      <div className="flex-1 flex flex-col items-center justify-center px-[80px]">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.4 }} className="text-[80px] mb-6">
          🐇
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#f5f0fa] rounded-[28px] px-12 py-8 border-2 border-[#e8dff5] shadow-[0_16px_50px_rgba(124,92,184,0.15)] mb-10 max-w-[900px]"
        >
          <p className="text-[38px] font-bold text-[#2d1b4e] text-center leading-snug italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            "Wonderead is like Duolingo meets Kindle,<br/>but built for kids who've given up on reading."
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-[#7c5cb8] to-[#3a9e7e] text-white rounded-full px-12 py-5 text-[28px] font-bold shadow-[0_8px_30px_rgba(124,92,184,0.3)]">
            Try the Live Demo →
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-[22px] text-[#6b5087] mt-8"
        >
          Thank you! Questions? 💜
        </motion.p>
      </div>

      {/* Right side - meme */}
      <div className="w-[560px] flex flex-col items-center justify-center pr-[80px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="relative"
        >
          <div className="w-[440px] h-[360px] rounded-[24px] overflow-hidden border-4 border-[#e8dff5] shadow-[0_20px_60px_rgba(124,92,184,0.25)] rotate-2">
            <img src="/images/success-kid.jpg" alt="Success Kid" className="w-full h-full object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 bg-[#7c5cb8] text-white rounded-[20px] px-8 py-4 text-center shadow-lg -rotate-1"
          >
            <div className="text-[24px] font-black leading-tight">WHEN THE READING APP</div>
            <div className="text-[24px] font-black leading-tight">ACTUALLY MAKES KIDS READ 📖</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  ),
];

/* ─── Presentation component ─── */
const PitchDeck = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, slides.length - 1)), []);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape" && isFullscreen) document.exitFullscreen();
      if (e.key === "f" || e.key === "F5") { e.preventDefault(); toggleFullscreen(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, isFullscreen, toggleFullscreen]);

  const SlideComponent = slides[current];

  return (
    <div className={`h-screen w-screen flex flex-col ${isFullscreen ? "bg-black" : "bg-[#1a1625]"}`}>
      {/* Toolbar */}
      {!isFullscreen && (
        <div className="h-14 bg-[#221d30] border-b border-purple-900/30 px-5 flex items-center justify-between shrink-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/home")} className="text-purple-300 hover:text-white transition-colors">
              <Home size={20} />
            </button>
            <span className="text-purple-100 font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
              🐇 Wonderead Pitch Deck
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-purple-300/60 text-xs">
              {current + 1} / {slides.length}
            </span>
            <button
              onClick={toggleFullscreen}
              className="w-8 h-8 rounded-lg bg-purple-800/40 text-purple-200 flex items-center justify-center hover:bg-purple-700/50 transition-colors"
              title="Fullscreen (F5)"
            >
              <Maximize size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Slide area */}
      <div className="flex-1 flex relative overflow-hidden" ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <ScaledSlide containerRef={containerRef}>
              <div className="w-full h-full rounded-[8px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.3)]">
                <SlideComponent />
              </div>
            </ScaledSlide>
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur text-white flex items-center justify-center hover:bg-white/20 transition disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur text-white flex items-center justify-center hover:bg-white/20 transition disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Fullscreen exit hint */}
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-lg bg-black/40 text-white/60 flex items-center justify-center hover:text-white hover:bg-black/60 transition opacity-0 hover:opacity-100"
          >
            <Minimize size={18} />
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {!isFullscreen && (
        <div className="h-24 bg-[#221d30] border-t border-purple-900/30 px-5 flex items-center gap-3 overflow-x-auto shrink-0">
          {slides.map((Slide, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`shrink-0 w-[128px] h-[72px] rounded-lg overflow-hidden border-2 transition-all ${
                i === current ? "border-purple-400 shadow-[0_0_12px_rgba(139,92,246,0.4)]" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <div className="w-[1920px] h-[1080px] origin-top-left" style={{ transform: `scale(${128 / 1920})` }}>
                <Slide />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

import React from "react";
export default PitchDeck;
