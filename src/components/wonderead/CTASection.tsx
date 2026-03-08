import { motion } from "framer-motion";
import InteractiveBunny from "./InteractiveBunny";
const CTASection = () => {
  return (
    <section className="py-28 px-5 md:px-10 text-center relative z-[1]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <InteractiveBunny size={90} showBaby={true} />
        </div>
        <h2 className="font-display text-[clamp(38px,6vw,60px)] font-black text-foreground mb-4 leading-[1.1]">
          "Curiouser and<br /><em className="text-lavender-deep italic">curiouser."</em>
        </h2>
        <p className="font-body text-[17px] text-text-mid mb-9 max-w-[480px] mx-auto leading-[1.7]">
          — Alice, and every child who discovers the magic of reading with Wonderead.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="bg-lavender-deep text-primary-foreground border-none rounded-[14px] px-8 py-4 text-base font-semibold cursor-pointer shadow-[0_6px_24px_rgba(100,70,160,0.35)] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(100,70,160,0.5)] transition-all">
            Open a Story ✦
          </button>
          <button className="bg-transparent text-text-mid border-[1.5px] border-border rounded-[14px] px-8 py-4 text-base font-medium cursor-pointer hover:bg-lavender transition-all">
            🧠 Try ADHD Demo
          </button>
        </div>
        <div className="mt-8 text-xs text-text-soft">
          Built with 🤖 Gemini · 🔊 ElevenLabs · 🗄️ MongoDB · ⚛️ React
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
