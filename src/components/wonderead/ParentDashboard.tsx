import { useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { icon: "⏱️", value: "42m", label: "Today's reading", bg: "bg-lavender", color: "text-lavender-deep" },
  { icon: "📖", value: "12", label: "Scenes completed", bg: "bg-blush", color: "text-blush-deep" },
  { icon: "🧠", value: "91%", label: "Focus score", bg: "bg-mint", color: "text-mint-deep" },
  { icon: "🔥", value: "5", label: "Day streak", bg: "bg-peach", color: "text-peach-deep" },
];

const bars = [
  { day: "Mon", h: "40%" }, { day: "Tue", h: "65%" }, { day: "Wed", h: "30%" },
  { day: "Thu", h: "80%" }, { day: "Fri", h: "55%" }, { day: "Sat", h: "90%" },
  { day: "Sun", h: "52%", today: true },
];

const ParentDashboard = () => {
  const [goal, setGoal] = useState(20);

  return (
    <section className="py-24 px-5 md:px-10 max-w-[1100px] mx-auto relative z-[1]">
      <div className="text-[11px] tracking-[0.18em] uppercase text-blush-deep font-semibold mb-3">◆ Parent Dashboard</div>
      <h2 className="font-display text-[clamp(34px,5vw,52px)] font-black leading-[1.1] text-foreground mb-3">
        Your child's<br /><em className="text-blush-deep italic">reading story.</em>
      </h2>
      <p className="font-body text-base text-text-mid leading-[1.7] max-w-[520px] mb-16">
        Real-time insights on reading habits, focus, and progress. Set goals, track improvement.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-card rounded-[32px] p-6 md:p-9 shadow-[0_20px_60px_rgba(196,92,138,0.1)] border-[1.5px] border-blush"
      >
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start mb-8 gap-4">
          <div>
            <div className="font-display text-[28px] font-bold text-foreground">Arjun's Report</div>
            <div className="text-[13px] text-text-soft mt-1">Grade 3 · ADHD Mode on · Last active 2 hours ago</div>
          </div>
          <span className="bg-blush text-blush-deep rounded-[10px] px-3.5 py-1.5 text-xs font-semibold">📅 This Week</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${s.bg} rounded-[20px] p-5 text-center`}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`font-display text-[32px] font-black leading-none ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-text-soft mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <div className="mb-7">
          <div className="text-xs text-text-soft tracking-widest uppercase mb-3">Weekly Reading Minutes</div>
          <div className="flex gap-2.5 items-end h-20">
            {bars.map(b => (
              <div key={b.day} className="flex-1 flex flex-col items-center gap-1.5 h-full">
                <div
                  className={`w-full rounded-t-md ${b.today ? "bg-lavender-deep" : "bg-lavender"}`}
                  style={{ height: b.h, marginTop: "auto" }}
                />
                <span className={`text-[10px] ${b.today ? "text-lavender-deep font-semibold" : "text-text-soft"}`}>{b.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div className="bg-peach rounded-[18px] px-5 py-4 flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="text-sm font-semibold text-foreground">🎯 Daily Reading Goal</div>
            <div className="text-[11px] text-text-soft mt-0.5">Set how many minutes per day</div>
          </div>
          <div className="flex gap-2">
            {[10, 20, 30].map(m => (
              <button
                key={m}
                onClick={() => setGoal(m)}
                className={`px-4 py-2 rounded-[10px] text-xs font-semibold transition-all ${
                  goal === m
                    ? "bg-peach-deep text-primary-foreground shadow-[0_4px_12px_rgba(208,98,42,0.3)]"
                    : "bg-card/60 text-text-mid"
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ParentDashboard;
