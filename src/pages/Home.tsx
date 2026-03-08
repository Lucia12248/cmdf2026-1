import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { stories } from "@/data/stories";
import { BarChart3, StickyNote, Settings, LogOut, HelpCircle, User, X, Sparkles, BookOpen, Star } from "lucide-react";
import FloatingParticles from "@/components/wonderead/FloatingParticles";
import MagicCursor from "@/components/wonderead/MagicCursor";
import LevelBadge from "@/components/wonderead/LevelBadge";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const continueStory = stories[0];
  const [showSettings, setShowSettings] = useState(false);
  const [hoveredStory, setHoveredStory] = useState<string | null>(null);
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Serah";

  const timeOfDay = () => {
    const h = new Date().getHours();
    if (h < 12) return "morning";
    if (h < 17) return "afternoon";
    return "evening";
  };

  const greetingEmoji = () => {
    const h = new Date().getHours();
    if (h < 12) return "🌅";
    if (h < 17) return "☀️";
    return "🌙";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender/30 via-cream to-mint/25 relative overflow-hidden">
      <FloatingParticles count={12} />
      <MagicCursor />

      {/* Animated gradient blobs */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="fixed w-[450px] h-[450px] rounded-full bg-lavender opacity-40 -top-32 -right-16 pointer-events-none blur-2xl z-0"
      />
      <motion.div
        animate={{ x: [0, -30, 25, 0], y: [0, 25, -20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="fixed w-[350px] h-[350px] rounded-full bg-blush opacity-30 -bottom-20 -left-20 pointer-events-none blur-2xl z-0"
      />
      <motion.div
        animate={{ x: [0, 20, -15, 0], y: [0, -20, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed w-[280px] h-[280px] rounded-full bg-mint opacity-30 bottom-40 right-10 pointer-events-none blur-xl z-0"
      />
      {/* Extra lavender orb */}
      <motion.div
        animate={{ x: [0, -15, 20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="fixed w-[320px] h-[320px] rounded-full bg-lavender-mid opacity-15 top-1/2 left-1/4 pointer-events-none blur-2xl z-0"
      />

      {/* Top Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-cream/80 border-b border-lavender-mid/25 px-5 md:px-10 py-3.5 flex items-center justify-between shadow-[0_2px_16px_rgba(124,92,184,0.06)]">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="font-display text-[22px] font-black text-foreground tracking-tight flex items-center cursor-pointer"
        >
          <motion.span
            animate={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mr-2 inline-block"
          >
            🐇
          </motion.span>
          Wonder<span className="text-lavender-deep">ead</span>
        </motion.div>
        <div className="flex items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center hover:bg-lavender-mid transition-colors animate-glow relative"
            title="Dashboard"
          >
            <BarChart3 size={18} className="text-lavender-deep" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-mint-deep text-primary-foreground text-[8px] font-bold rounded-full flex items-center justify-center">5</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/notes")}
            className="w-10 h-10 rounded-full bg-mint flex items-center justify-center hover:bg-mint-mid transition-colors relative"
            title="My Notes"
          >
            <StickyNote size={18} className="text-mint-deep" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-peach-deep text-primary-foreground text-[8px] font-bold rounded-full flex items-center justify-center">5</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 rounded-full bg-peach flex items-center justify-center hover:bg-peach-mid transition-colors relative"
            title="Settings"
          >
            <motion.div animate={{ rotate: showSettings ? 90 : 0 }} transition={{ duration: 0.3 }}>
              <Settings size={18} className="text-peach-deep" />
            </motion.div>
          </motion.button>
        </div>
      </nav>

      {/* Settings Dropdown */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-5 md:right-10 top-16 z-50 bg-cream rounded-2xl shadow-[0_16px_48px_rgba(124,92,184,0.18)] border border-lavender-mid/30 p-2 w-56"
            >
              <div className="px-3 py-2 border-b border-lavender-mid/20 mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-lavender-deep flex items-center justify-center text-primary-foreground text-xs font-bold">{displayName[0]?.toUpperCase()}</div>
                  <div>
                    <p className="font-display font-bold text-sm text-foreground">{displayName}</p>
                    <p className="text-[11px] text-text-soft">⭐ Level 3 Reader</p>
                  </div>
                </div>
              </div>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-mid hover:bg-lavender/50 transition-colors">
                <User size={16} /> Profile
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-mid hover:bg-lavender/50 transition-colors">
                <Settings size={16} /> Settings
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-mid hover:bg-lavender/50 transition-colors">
                <HelpCircle size={16} /> Help Center
              </button>
              <div className="border-t border-lavender-mid/20 mt-1 pt-1">
                <button
                  onClick={async () => { await signOut(); navigate("/"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-blush-deep hover:bg-blush/30 transition-colors"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8 relative z-10">
        {/* Greeting with animated emoji */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mb-1 flex items-center gap-2 flex-wrap">
            Good {timeOfDay()}, {displayName}
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              {greetingEmoji()}
            </motion.span>
          </h1>
          <p className="font-body text-sm text-text-soft">Ready for another adventure?</p>
        </motion.div>

        {/* Level + Streak Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <div className="flex-1">
            <LevelBadge level={3} xp={145} maxXp={200} title="Story Explorer" />
          </div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 bg-peach rounded-2xl px-4 py-3 border border-peach-mid/30"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-3xl"
            >
              🔥
            </motion.span>
            <div>
              <div className="font-display text-2xl font-black text-peach-deep">5 Days</div>
              <div className="text-[10px] text-text-mid font-semibold">Reading Streak!</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Action Bubbles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          {[
            { emoji: "🧠", label: "ADHD Mode", color: "bg-mint", border: "border-mint-mid/30" },
            { emoji: "📊", label: "My Stats", color: "bg-lavender", border: "border-lavender-mid/30", onClick: () => navigate("/dashboard") },
            { emoji: "✏️", label: "My Notes", color: "bg-peach", border: "border-peach-mid/30", onClick: () => navigate("/notes") },
            { emoji: "🏆", label: "Achievements", color: "bg-blush", border: "border-blush-mid/30", onClick: () => navigate("/dashboard") },
          ].map((item, i) => (
            <motion.button
              key={item.label}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={item.onClick}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className={`${item.color} ${item.border} border rounded-2xl px-5 py-3 flex items-center gap-2 shrink-0 shadow-sm`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-xs font-semibold text-foreground whitespace-nowrap">{item.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Continue Reading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10"
        >
          <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-lavender-deep mb-3 flex items-center gap-1.5">
            <Sparkles size={14} /> Continue Reading
          </h2>
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 16px 50px rgba(124,92,184,0.2)" }}
            onClick={() => navigate(`/story/${continueStory.id}`)}
            className="bg-gradient-to-br from-cream to-lavender/20 rounded-[24px] border border-lavender-mid/30 shadow-[0_10px_40px_rgba(124,92,184,0.12)] overflow-hidden cursor-pointer transition-all relative group"
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lavender/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 pointer-events-none" />
            <div className="flex items-center gap-0">
              <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] shrink-0 overflow-hidden relative">
                <img
                  src={continueStory.coverImage}
                  alt={continueStory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20" />
              </div>
              <div className="flex-1 min-w-0 p-4 md:p-5">
                <div className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                  {continueStory.title}
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-sm">📖</motion.span>
                </div>
                <div className="text-xs text-text-soft mb-2">
                  Scene {continueStory.lastScene + 1} of {continueStory.scenes.length} · {continueStory.author}
                </div>
                <div className="h-2 bg-lavender rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${continueStory.progress * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-lavender-deep to-blush-deep rounded-full"
                  />
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="pr-5 text-2xl"
              >
                ▶
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Story Library */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-lavender-deep mb-4 flex items-center gap-1.5">
            <BookOpen size={14} /> Your Stories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 14px 40px rgba(124,92,184,0.16)", scale: 1.02 }}
                onHoverStart={() => setHoveredStory(story.id)}
                onHoverEnd={() => setHoveredStory(null)}
                onClick={() => navigate(`/story/${story.id}`)}
                className="bg-gradient-to-br from-cream to-lavender/10 rounded-[22px] border border-lavender-mid/25 overflow-hidden cursor-pointer transition-shadow relative group"
              >
                <div className="h-[160px] overflow-hidden relative">
                  {story.coverImage ? (
                    <motion.img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: hoveredStory === story.id ? 1.08 : 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <motion.div
                      className={`w-full h-full bg-gradient-to-br ${
                        story.scenes[0]?.gradient || "from-lavender to-mint"
                      } flex items-center justify-center`}
                      animate={{ scale: hoveredStory === story.id ? 1.08 : 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="text-[64px]">{story.cover}</span>
                    </motion.div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] font-bold text-foreground flex items-center gap-1">
                    <Star size={10} className="text-peach-deep" /> {story.scenes.length} scenes
                  </span>
                  <AnimatePresence>
                    {hoveredStory === story.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute bottom-3 left-3 text-4xl"
                      >
                        {story.cover}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="p-4">
                  <div className="font-display text-base font-bold text-foreground mb-0.5">{story.title}</div>
                  <div className="text-[11px] text-text-soft mb-3">{story.author}</div>
                  {story.progress > 0 ? (
                    <div className="h-1.5 bg-lavender rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-lavender-deep to-blush-deep rounded-full transition-all"
                        style={{ width: `${story.progress * 100}%` }}
                      />
                    </div>
                  ) : (
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="inline-block text-[10px] font-semibold text-lavender-deep bg-lavender rounded-full px-3 py-1"
                    >
                      Start Reading ✦
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun fact footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block bg-lavender/50 rounded-2xl px-6 py-3 border border-lavender-mid/20"
          >
            <span className="text-sm">💡</span>
            <span className="text-[11px] text-text-mid ml-2 font-body italic">
              Did you know? Reading 20 minutes a day exposes you to 1.8 million words per year!
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
