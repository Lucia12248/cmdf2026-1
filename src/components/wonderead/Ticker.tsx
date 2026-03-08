const Ticker = () => {
  const text = "🤖 Powered by Gemini API  ·  🔊 ElevenLabs Voice  ·  🧠 ADHD Reading Mode  ·  👨‍👩‍👧 Parent Dashboard  ·  🐇 Alice in Wonderland Demo  ·  🎨 AI Scene Animation  ·  📖 Any Story, Any Child  ·  🌐 wonderead.tech  ·  ";

  return (
    <div className="bg-lavender-deep py-3 overflow-hidden whitespace-nowrap">
      <span className="inline-block animate-ticker text-[13px] text-primary-foreground/85 tracking-wide">
        {text}{text}
      </span>
    </div>
  );
};

export default Ticker;
