const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/50 py-10 px-5 md:px-10 flex flex-wrap justify-between items-center gap-4 text-[13px] border-t border-primary-foreground/10">
      <div>
        <strong className="text-primary-foreground font-display text-base">Wonderead</strong> <span className="opacity-60">·</span> Where every story falls alive.
      </div>
      <div className="opacity-70">wonderead.tech · Hackathon 2026 · Team of 4</div>
    </footer>
  );
};

export default Footer;
