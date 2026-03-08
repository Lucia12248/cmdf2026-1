import { useState } from "react";
import { motion } from "framer-motion";
import InteractiveBunny from "./InteractiveBunny";
const scenes = [
  { emoji: "🐇", name: "The White Rabbit", setting: "📍 A sunny riverbank, afternoon", mood: "Curious", moodStyle: "bg-lavender text-lavender-deep", gradient: "from-lavender to-blush" },
  { emoji: "🕳️", name: "The Rabbit Hole", setting: "📍 Falling through a dark tunnel", mood: "Mysterious", moodStyle: "bg-mint text-mint-deep", gradient: "from-mint to-lavender" },
  { emoji: "🍄", name: "The Caterpillar", setting: "📍 A magical mushroom garden", mood: "Whimsical", moodStyle: "bg-peach text-peach-deep", gradient: "from-peach to-blush" },
  { emoji: "🎩", name: "The Mad Tea Party", setting: "📍 A table under the trees", mood: "Joyful", moodStyle: "bg-blush text-blush-deep", gradient: "from-mint to-peach" },
];

const SceneBrowser = () => {
  const [active, setActive] = useState(1);

  return (
    <section className="py-24 px-5 md:px-10 bg-lavender relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-lavender-deep font-semibold mb-3">◆ Scene Browser</div>
            <h2 className="font-display text-[clamp(34px,5vw,52px)] font-black leading-[1.1] text-foreground mb-4">Jump to any scene.</h2>
            <p className="font-body text-base text-text-mid leading-[1.7] max-w-[520px] mb-12">
              Gemini splits the story into scenes. Each one gets its own animation prompt, mood, and voice segment.
            </p>
          </div>
          <div className="hidden md:block">
            <InteractiveBunny size={75} showBaby={true} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenes.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`bg-card rounded-[22px] overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] border-2 ${
                active === i ? "border-lavender-deep shadow-[0_0_0_4px_rgba(124,92,184,0.15)]" : "border-transparent"
              }`}
            >
              <div className={`h-[120px] bg-gradient-to-br ${s.gradient} flex items-center justify-center text-[52px] relative`}>
                {s.emoji}
                <span className="absolute top-2.5 left-3 bg-card/90 rounded-[7px] px-2 py-[3px] text-[10px] font-bold text-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-3.5 px-4">
                <div className="font-display text-sm font-bold text-foreground mb-1">{s.name}</div>
                <div className="text-[11px] text-text-soft">{s.setting}</div>
                <span className={`inline-block mt-2 text-[9px] font-semibold tracking-wider px-2 py-[3px] rounded-[20px] uppercase ${s.moodStyle}`}>
                  {s.mood}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SceneBrowser;
