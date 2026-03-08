import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import InteractiveBunny from "./InteractiveBunny";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center px-5 md:px-10 pt-20 pb-16 gap-16 relative z-[1]">
      <div className="flex-1 max-w-[560px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-lavender border-[1.5px] border-lavender-mid rounded-[20px] px-4 py-1.5 text-xs font-medium text-lavender-deep tracking-wider mb-6"
        >
          ✦ Alice in Wonderland Demo Live 🐇
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[clamp(52px,7vw,82px)] font-black leading-[1.05] tracking-tight text-foreground mb-5"
        >
          Where every<br />
          <em className="text-lavender-deep italic">story falls</em><br />
          alive.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-[17px] text-text-mid leading-[1.75] mb-9"
        >
          Gemini splits your story into scenes.<br />
          ElevenLabs narrates it with real human emotion.<br />
          Built for every child — especially those with ADHD.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-3 flex-wrap"
        >
          <button className="bg-lavender-deep text-primary-foreground border-none rounded-[14px] px-7 py-3.5 text-[15px] font-semibold cursor-pointer shadow-[0_6px_24px_rgba(100,70,160,0.35)] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(100,70,160,0.5)] transition-all">
            Open a Story ✦
          </button>
          <button className="bg-transparent text-text-mid border-[1.5px] border-border rounded-[14px] px-7 py-3.5 text-[15px] font-medium cursor-pointer hover:bg-lavender transition-all">
            🧠 Try ADHD Mode
          </button>
        </motion.div>

        {/* Interactive bunny with baby */}
        <div className="mt-8 hidden md:block">
          <InteractiveBunny size={90} showBaby={true} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex-1 hidden md:flex justify-center items-center"
      >
        <PhoneMockup />
      </motion.div>
    </section>
  );
};

export default HeroSection;
