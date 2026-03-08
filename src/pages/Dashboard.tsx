import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Clock, Flame, BookOpen, Brain, Trophy, Target, Zap } from "lucide-react";
import FloatingParticles from "@/components/wonderead/FloatingParticles";
import LevelBadge from "@/components/wonderead/LevelBadge";

const stats = [
  { icon: <Clock size={20} />, value: "42m", label: "Today's reading", bg: "bg-lavender", color: "text-lavender-deep", emoji: "⏰" },
  { icon: <BookOpen size={20} />, value: "12", label: "Scenes completed", bg: "bg-blush", color: "text-blush-deep", emoji: "📖" },
  { icon: <Brain size={20} />, value: "91%", label: "Focus score", bg: "bg-mint", color: "text-mint-deep", emoji: "🧠" },
  { icon: <Flame size={20} />, value: "5", label: "Day streak", bg: "bg-peach", color: "text-peach-deep", emoji: "🔥" },
];

const bars = [
  { day: "Mon", h: 40 }, { day: "Tue", h: 65 }, { day: "Wed", h: 30 },
  { day: "Thu", h: 80 }, { day: "Fri", h: 55 }, { day: "Sat", h: 90 },
  { day: "Sun", h: 52, today: true },
];

const achievements = [
  { emoji: "🌟", title: "First Story", desc: "Completed your first story", unlocked: true },
  { emoji: "🔥", title: "5-Day Streak", desc: "Read 5 days in a row", unlocked: true },
  { emoji: "🧠", title: "Focus Master", desc: "90%+ focus score", unlocked: true },
  { emoji: "📚", title: "Bookworm", desc: "Read 10+ scenes", unlocked: true },
  { emoji: "🏰", title: "World Explorer", desc: "Read 3 different stories", unlocked: false },
  { emoji: "⚡", title: "Speed Reader", desc: "Read 5 scenes in one day", unlocked: false },
];

const recentActivity = [
  { time: "2h ago", text: "Finished Scene 2 of Alice in Wonderland", emoji: "🐇", xp: "+15 XP" },
  { time: "Yesterday", text: "Started Humpty Dumpty", emoji: "🥚", xp: "+10 XP" },
  { time: "2 days ago", text: "Earned Focus Master badge", emoji: "🏆", xp: "+50 XP" },
  { time: "3 days ago", text: "Read for 45 minutes", emoji: "⏱️", xp: "+20 XP" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState(20);
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender/20 via-background to-mint/15 relative overflow-hidden">
      <FloatingParticles count={8} />

      {/* Blobs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
        className="fixed w-[400px] h-[400px] rounded-full bg-lavender opacity-20 -top-28 -right-20 pointer-events-none blur-2xl z-0"
      />
      <motion.div
        animate={{ x: [0, -20, 15, 0], y: [0, 15, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="fixed w-[300px] h-[300px] rounded-full bg-mint opacity-15 bottom-20 -left-16 pointer-events-none blur-2xl z-0"
      />

      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-lavender-mid/20 px-5 md:px-10 py-3.5 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/home")}
          className="text-text-mid hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <div className="flex items-center gap-2">
          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-xl">📊</motion.span>
          <span className="font-display text-lg font-bold text-foreground">Serah's Dashboard</span>
        </div>
        <div className="ml-auto flex gap-2">
          {(["week", "month"] as const).map((t) => (
            <motion.button
              key={t}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                timeRange === t
                  ? "bg-lavender-deep text-primary-foreground shadow-sm"
                  : "bg-lavender/50 text-text-mid hover:bg-lavender"
              }`}
            >
              {t === "week" ? "This Week" : "This Month"}
            </motion.button>
          ))}
        </div>
      </nav>

      <div className="max-w-[800px] mx-auto px-5 md:px-10 py-8 relative z-10">
        {/* Level Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <LevelBadge level={3} xp={145} maxXp={200} title="Story Explorer" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08, type: "spring", bounce: 0.4 }}
              whileHover={{ y: -4, scale: 1.04 }}
              className={`${s.bg} rounded-[20px] p-5 text-center relative overflow-hidden group cursor-default`}
            >
              {/* Hover sparkle */}
              <div className="absolute inset-0 bg-gradient-to-br from-card/0 to-card/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="text-2xl mb-1"
              >
                {s.emoji}
              </motion.div>
              <div className={`font-display text-[32px] font-black leading-none ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-text-soft mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-[24px] border border-lavender-mid/20 p-6 mb-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                📈 Reading Minutes
              </h3>
              <p className="text-[11px] text-text-soft">Weekly overview</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 text-mint-deep text-xs font-semibold bg-mint rounded-lg px-2.5 py-1"
            >
              <TrendingUp size={14} /> +12%
            </motion.div>
          </div>
          <div className="flex gap-2.5 items-end h-32">
            {bars.map((b, i) => (
              <div key={b.day} className="flex-1 flex flex-col items-center gap-1.5 h-full">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${b.h}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.06, type: "spring", bounce: 0.3 }}
                  whileHover={{ scaleX: 1.15 }}
                  className={`w-full rounded-t-xl mt-auto cursor-default transition-colors ${
                    b.today
                      ? "bg-gradient-to-t from-lavender-deep to-blush-deep"
                      : "bg-lavender hover:bg-lavender-mid"
                  }`}
                />
                <span className={`text-[10px] ${b.today ? "text-lavender-deep font-bold" : "text-text-soft"}`}>
                  {b.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Goal + Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Goal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-peach rounded-[22px] p-5 relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 text-[80px] opacity-10 pointer-events-none"
            >
              🎯
            </motion.div>
            <div className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
              <Target size={16} className="text-peach-deep" /> Daily Reading Goal
            </div>
            <div className="text-[11px] text-text-soft mb-4">Set how many minutes per day</div>
            <div className="flex gap-2">
              {[10, 20, 30, 45].map((m) => (
                <motion.button
                  key={m}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGoal(m)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    goal === m
                      ? "bg-peach-deep text-primary-foreground shadow-[0_4px_12px_rgba(208,98,42,0.3)]"
                      : "bg-card/60 text-text-mid hover:bg-card"
                  }`}
                >
                  {m}m
                </motion.button>
              ))}
            </div>
            {/* Goal progress */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-text-mid mb-1">
                <span>Today's progress</span>
                <span className="font-bold text-peach-deep">42m / {goal}m</span>
              </div>
              <div className="h-2 bg-card/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (42 / goal) * 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-peach-deep to-blush-deep rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-card rounded-[22px] border border-lavender-mid/20 p-5"
          >
            <div className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Trophy size={16} className="text-peach-deep" /> Achievements
            </div>
            <div className="grid grid-cols-3 gap-2">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.title}
                  whileHover={a.unlocked ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
                  className={`rounded-xl p-2.5 text-center transition-all ${
                    a.unlocked
                      ? "bg-lavender/40 cursor-default"
                      : "bg-muted/30 opacity-50 grayscale"
                  }`}
                >
                  <motion.div
                    animate={a.unlocked ? { y: [0, -3, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="text-xl mb-1"
                  >
                    {a.emoji}
                  </motion.div>
                  <div className="text-[9px] font-bold text-foreground leading-tight">{a.title}</div>
                  {!a.unlocked && <div className="text-[8px] text-text-soft mt-0.5">🔒 Locked</div>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-[22px] border border-lavender-mid/20 p-5"
        >
          <div className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap size={16} className="text-peach-deep" /> Recent Activity
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center text-lg shrink-0"
                >
                  {a.emoji}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground">{a.text}</div>
                  <div className="text-[10px] text-text-soft">{a.time}</div>
                </div>
                <span className="text-[10px] font-bold text-mint-deep bg-mint rounded-lg px-2 py-1 shrink-0">
                  {a.xp}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
