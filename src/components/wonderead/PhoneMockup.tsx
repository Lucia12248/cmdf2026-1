const PhoneMockup = () => {
  return (
    <div className="w-[300px] bg-card rounded-[40px] shadow-[0_30px_80px_rgba(124,92,184,0.2),0_0_0_8px_rgba(201,184,232,0.4)] overflow-hidden relative">
      {/* Notch */}
      <div className="w-20 h-[22px] bg-background rounded-b-[14px] mx-auto relative z-10" />
      
      {/* Screen */}
      <div className="bg-background p-4 min-h-[580px]">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3.5">
          <span className="text-lg cursor-pointer">←</span>
          <div className="flex-1">
            <div className="font-display text-base font-bold text-foreground">Alice in Wonderland</div>
            <div className="text-[10px] text-text-soft">Scene 2 of 4 · 🔊 ElevenLabs narrating</div>
          </div>
          <span className="text-xl">🧠</span>
        </div>

        {/* Scene illustration */}
        <div className="bg-gradient-to-br from-lavender to-blush rounded-[20px] h-40 flex items-center justify-center relative overflow-hidden mb-3.5">
          <span className="text-[64px] animate-bob">🕳️</span>
          <span className="absolute bottom-2.5 left-3 bg-card/85 backdrop-blur-lg rounded-[10px] px-2.5 py-1 text-[10px] text-lavender-deep font-semibold">🎨 AI Animated</span>
          <span className="absolute top-2.5 right-3 bg-card/85 rounded-lg px-2.5 py-[3px] text-[9px] text-text-mid font-medium">✨ Curious</span>
        </div>

        {/* Scene pills */}
        <div className="flex gap-1.5 mb-3">
          <div className="flex-1 h-1 rounded-sm bg-lavender-mid" />
          <div className="flex-1 h-1 rounded-sm bg-lavender-deep" />
          <div className="flex-1 h-1 rounded-sm bg-lavender" />
          <div className="flex-1 h-1 rounded-sm bg-lavender" />
        </div>

        {/* Text area */}
        <div className="bg-card rounded-[14px] p-3.5 mb-3">
          <p className="font-body text-xs leading-[1.9] text-text-mid">
            <span><span className="font-extrabold text-foreground">In</span> <span className="font-extrabold text-foreground">ano</span>ther</span>{" "}
            <span><span className="font-extrabold text-foreground">mom</span>ent</span>,{" "}
            <span className="bg-lavender rounded px-0.5 text-lavender-deep font-semibold"><span className="font-extrabold">Ali</span>ce</span>{" "}
            <span><span className="font-extrabold text-foreground">ha</span>d</span>{" "}
            <span><span className="font-extrabold text-foreground">fol</span>lowed</span>{" "}
            <span><span className="font-extrabold text-foreground">th</span>e</span>{" "}
            <span><span className="font-extrabold text-foreground">Whi</span>te</span>{" "}
            <span><span className="font-extrabold text-foreground">Rab</span>bit</span>{" "}
            <span><span className="font-extrabold text-foreground">dow</span>n</span>{" "}
            <span><span className="font-extrabold text-foreground">th</span>e</span>{" "}
            <span><span className="font-extrabold text-foreground">lar</span>ge</span>{" "}
            <span><span className="font-extrabold text-foreground">rab</span>bit-hole</span>{" "}
            <span><span className="font-extrabold text-foreground">und</span>er</span>{" "}
            <span><span className="font-extrabold text-foreground">th</span>e</span>{" "}
            <span><span className="font-extrabold text-foreground">hed</span>ge.</span>{" "}
            <span><span className="font-extrabold text-foreground">Th</span>e</span>{" "}
            <span><span className="font-extrabold text-foreground">hol</span>e</span>{" "}
            <span><span className="font-extrabold text-foreground">wen</span>t</span>{" "}
            <span><span className="font-extrabold text-foreground">str</span>aight</span>{" "}
            <span><span className="font-extrabold text-foreground">on</span></span>{" "}
            <span><span className="font-extrabold text-foreground">lik</span>e</span>{" "}
            <span><span className="font-extrabold text-foreground">a</span></span>{" "}
            <span><span className="font-extrabold text-foreground">tunn</span>el…</span>
          </p>
        </div>

        {/* Play bar */}
        <div className="bg-card rounded-2xl p-3 flex items-center gap-2.5 shadow-[0_4px_16px_rgba(124,92,184,0.1)]">
          <div className="w-[38px] h-[38px] rounded-full bg-lavender-deep flex items-center justify-center text-sm text-primary-foreground shadow-[0_4px_12px_rgba(124,92,184,0.4)] shrink-0">
            ▶
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-semibold text-foreground">Scene 2 — The Rabbit Hole</div>
            <div className="text-[9px] text-text-soft">Voice: ElevenLabs · Alice</div>
            <div className="h-[3px] bg-lavender rounded-sm mt-1.5">
              <div className="h-full w-2/5 bg-lavender-deep rounded-sm" />
            </div>
          </div>
          <span className="text-lg">🔊</span>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
