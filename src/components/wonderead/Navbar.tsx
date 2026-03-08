const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/90 border-b border-border px-5 md:px-10 py-3.5 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="font-display text-[26px] font-black text-foreground tracking-tight flex items-center whitespace-nowrap">
        <span className="mr-2">🐇</span>
        Wonder<span className="text-lavender-deep">ead</span>
      </div>
      <div className="hidden md:flex gap-2 items-center">
        <button className="px-[18px] py-[7px] rounded-[20px] text-[13px] font-medium text-text-mid border-[1.5px] border-border bg-transparent hover:bg-lavender transition-all">
          Features
        </button>
        <button className="px-[18px] py-[7px] rounded-[20px] text-[13px] font-medium text-text-mid border-[1.5px] border-border bg-transparent hover:bg-lavender transition-all">
          How it works
        </button>
        <button className="px-[18px] py-[7px] rounded-[20px] text-[13px] font-medium text-peach-deep border-[1.5px] border-peach-mid bg-peach hover:bg-peach-mid/20 transition-all">
          👨‍👩‍👧 Parents
        </button>
        <button className="px-[18px] py-[7px] rounded-[20px] text-[13px] font-semibold bg-lavender-deep text-primary-foreground border-[1.5px] border-transparent shadow-[0_2px_8px_rgba(100,70,160,0.25)] hover:shadow-[0_4px_16px_rgba(100,70,160,0.35)] transition-all">
          Open a Story ✦
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
