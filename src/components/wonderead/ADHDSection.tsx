import { useState } from "react";
import { motion } from "framer-motion";

const adhdFeatures = [
  { icon: "🔤", title: "Bionic Reading", desc: "First half of every word bolded — eyes track faster, fatigue drops." },
  { icon: "✨", title: "Word Tracking", desc: "Current spoken word highlights in real time as ElevenLabs reads." },
  { icon: "🎬", title: "Scene Animation Rewards", desc: "A short animation plays after each scene — natural attention reset." },
  { icon: "📏", title: "Font & Spacing Control", desc: "OpenDyslexic font, adjustable size, wider line spacing — all toggleable." },
  { icon: "⏸️", title: "Auto Pacing", desc: "Story pauses naturally between scenes — never overwhelms working memory." },
];

const ADHDSection = () => {
  const [mode, setMode] = useState<"adhd" | "normal">("adhd");

  return (
    <section className="py-24 px-5 md:px-10 bg-gradient-to-br from-[#F0FAF5] via-[#EAF4FF] to-[#F8EFF8] relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-16 items-center">
        {/* Left */}
        <div className="flex-1 min-w-[300px]">
          <div className="text-[11px] tracking-[0.18em] uppercase text-mint-deep font-semibold mb-3">◆ ADHD Mode</div>
          <h2 className="font-display text-[clamp(34px,5vw,52px)] font-black leading-[1.1] text-foreground mb-4">
            Built for<br /><em className="text-mint-deep italic">every brain.</em>
          </h2>
          <p className="font-body text-base text-text-mid leading-[1.7] max-w-[520px] mb-9">
            Most reading apps were designed for neurotypical children. Wonderead is different.
          </p>
          <ul className="space-y-5">
            {adhdFeatures.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-3.5"
              >
                <div className="w-[42px] h-[42px] rounded-full bg-mint flex items-center justify-center text-lg shrink-0">
                  {f.icon}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground mb-[3px]">{f.title}</div>
                  <div className="text-xs text-text-soft leading-relaxed">{f.desc}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right - Demo card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 min-w-[300px]"
        >
          <div className="bg-card rounded-[28px] p-7 shadow-[0_20px_60px_rgba(58,158,126,0.12)]">
            <div className="font-display text-base font-bold text-foreground mb-1">Reading Mode Demo</div>
            <div className="text-xs text-text-soft mb-4">See the difference ADHD mode makes</div>

            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setMode("normal")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border-[1.5px] ${
                  mode === "normal"
                    ? "bg-mint-deep text-primary-foreground border-mint-deep shadow-[0_4px_16px_rgba(58,158,126,0.3)]"
                    : "bg-transparent text-mint-deep border-mint-mid"
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setMode("adhd")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border-[1.5px] ${
                  mode === "adhd"
                    ? "bg-mint-deep text-primary-foreground border-mint-deep shadow-[0_4px_16px_rgba(58,158,126,0.3)]"
                    : "bg-transparent text-mint-deep border-mint-mid"
                }`}
              >
                🧠 ADHD Mode
              </button>
            </div>

            {mode === "normal" ? (
              <p className="font-body text-[15px] leading-[1.9] text-text-mid mb-5">
                Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do. Once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, and what is the use of a book thought Alice, without pictures or conversations?
              </p>
            ) : (
              <p className="font-body text-base leading-[2.1] text-text-mid mb-5">
                <span><span className="font-black text-foreground">Ali</span>ce</span>{" "}
                <span><span className="font-black text-foreground">wa</span>s</span>{" "}
                <span><span className="font-black text-foreground">beg</span>inning</span>{" "}
                <span><span className="font-black text-foreground">t</span>o</span>{" "}
                <span><span className="font-black text-foreground">ge</span>t</span>{" "}
                <span><span className="font-black text-foreground">ver</span>y</span>{" "}
                <span className="bg-mint rounded px-[3px] text-mint-deep font-bold"><span className="font-black">tir</span>ed</span>{" "}
                <span><span className="font-black text-foreground">o</span>f</span>{" "}
                <span><span className="font-black text-foreground">sitt</span>ing</span>{" "}
                <span><span className="font-black text-foreground">b</span>y</span>{" "}
                <span><span className="font-black text-foreground">he</span>r</span>{" "}
                <span><span className="font-black text-foreground">sis</span>ter</span>{" "}
                <span><span className="font-black text-foreground">o</span>n</span>{" "}
                <span><span className="font-black text-foreground">th</span>e</span>{" "}
                <span><span className="font-black text-foreground">ban</span>k,</span>{" "}
                <span><span className="font-black text-foreground">an</span>d</span>{" "}
                <span><span className="font-black text-foreground">o</span>f</span>{" "}
                <span><span className="font-black text-foreground">hav</span>ing</span>{" "}
                <span><span className="font-black text-foreground">noth</span>ing</span>{" "}
                <span><span className="font-black text-foreground">t</span>o</span>{" "}
                <span><span className="font-black text-foreground">d</span>o.</span>{" "}
                <span><span className="font-black text-foreground">Onc</span>e</span>{" "}
                <span><span className="font-black text-foreground">o</span>r</span>{" "}
                <span><span className="font-black text-foreground">twic</span>e</span>{" "}
                <span><span className="font-black text-foreground">sh</span>e</span>{" "}
                <span><span className="font-black text-foreground">ha</span>d</span>{" "}
                <span><span className="font-black text-foreground">peepe</span>d</span>{" "}
                <span><span className="font-black text-foreground">int</span>o</span>{" "}
                <span><span className="font-black text-foreground">th</span>e</span>{" "}
                <span><span className="font-black text-foreground">boo</span>k…</span>
              </p>
            )}

            {/* Scene reward */}
            <div className="bg-mint rounded-[14px] p-4 mb-4">
              <div className="text-xs font-bold text-mint-deep mb-1">🎬 Scene 2 just finished!</div>
              <div className="text-[11px] text-text-mid">Animated reward playing... attention reset complete.</div>
              <div className="h-1 bg-mint-deep/20 rounded-sm mt-2.5">
                <div className="h-full w-[65%] bg-mint-deep rounded-sm" />
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-2">
              <div className="flex-1 bg-lavender rounded-xl p-3 text-center">
                <div className="text-[10px] text-text-soft mb-1">Focus time</div>
                <div className="text-[22px] font-extrabold text-lavender-deep font-display">18m</div>
              </div>
              <div className="flex-1 bg-blush rounded-xl p-3 text-center">
                <div className="text-[10px] text-text-soft mb-1">Scenes read</div>
                <div className="text-[22px] font-extrabold text-blush-deep font-display">2/4</div>
              </div>
              <div className="flex-1 bg-mint rounded-xl p-3 text-center">
                <div className="text-[10px] text-text-soft mb-1">Focus score</div>
                <div className="text-[22px] font-extrabold text-mint-deep font-display">91%</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ADHDSection;
