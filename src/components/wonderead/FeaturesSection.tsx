import { motion } from "framer-motion";
import InteractiveBunny from "./InteractiveBunny";
const features = [
  { icon: "🤖", title: "AI Scene Splitting", desc: "Gemini reads your story and breaks it into scenes — detecting mood, setting, characters, and what to animate.", tag: "Powered by Gemini API", color: "lavender" },
  { icon: "🔊", title: "Voice Narration", desc: "ElevenLabs reads the story in a warm, expressive human voice — not robotic, not flat. Real emotion, scene by scene.", tag: "Powered by ElevenLabs", color: "blush" },
  { icon: "🧠", title: "ADHD Reading Mode", desc: "Bionic reading, word-by-word tracking, dyslexia font, auto pacing, and animated scene breaks to reset attention.", tag: "Built for focus", color: "mint" },
  { icon: "👨‍👩‍👧", title: "Parent Dashboard", desc: "Track reading time, focus scores, completed scenes, and set daily goals. Weekly reports delivered automatically.", tag: "Stored in MongoDB", color: "peach" },
];

const bgMap: Record<string, string> = {
  lavender: "bg-lavender",
  blush: "bg-blush",
  mint: "bg-mint",
  peach: "bg-peach",
};
const tagMap: Record<string, string> = {
  lavender: "text-lavender-deep",
  blush: "text-blush-deep",
  mint: "text-mint-deep",
  peach: "text-peach-deep",
};

const FeaturesSection = () => {
  return (
    <section className="py-24 px-5 md:px-10 max-w-[1100px] mx-auto relative z-[1]">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] tracking-[0.18em] uppercase text-lavender-deep font-semibold mb-3">◆ Features</div>
          <h2 className="font-display text-[clamp(34px,5vw,52px)] font-black leading-[1.1] text-foreground mb-4">
            Everything a young<br />reader needs.
          </h2>
          <p className="font-body text-base text-text-mid leading-[1.7] max-w-[520px] mb-16">
            Four powerful features working together to make reading magical for every child.
          </p>
        </div>
        <div className="hidden md:block">
          <InteractiveBunny size={80} showBaby={true} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`${bgMap[f.color]} rounded-3xl p-7 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all cursor-default`}
          >
            <div className="w-[52px] h-[52px] rounded-2xl bg-card flex items-center justify-center text-[26px] mb-[18px] shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
              {f.icon}
            </div>
            <div className="font-display text-[19px] font-bold text-foreground mb-2">{f.title}</div>
            <div className="text-[13px] text-text-mid leading-[1.65]">{f.desc}</div>
            <span className={`inline-block mt-3.5 text-[10px] font-semibold tracking-wider px-3 py-1 rounded-[20px] bg-card/70 ${tagMap[f.color]}`}>
              {f.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
