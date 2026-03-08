import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import MagicCursor from "@/components/wonderead/MagicCursor";
import FloatingParticles from "@/components/wonderead/FloatingParticles";

// Floating story icons that drift around
const floatingIcons = [
  { emoji: "🐇", size: 40, x: "10%", y: "15%", delay: 0 },
  { emoji: "📖", size: 32, x: "85%", y: "20%", delay: 0.5 },
  { emoji: "🍄", size: 36, x: "75%", y: "70%", delay: 1 },
  { emoji: "🏰", size: 44, x: "15%", y: "75%", delay: 1.5 },
  { emoji: "✨", size: 28, x: "90%", y: "45%", delay: 0.8 },
  { emoji: "🌙", size: 34, x: "5%", y: "45%", delay: 1.2 },
  { emoji: "🎩", size: 30, x: "50%", y: "8%", delay: 0.3 },
  { emoji: "🦋", size: 26, x: "60%", y: "85%", delay: 1.8 },
  { emoji: "👸", size: 38, x: "30%", y: "90%", delay: 2.0 },
  { emoji: "🥚", size: 28, x: "40%", y: "5%", delay: 0.6 },
  { emoji: "🏮", size: 32, x: "92%", y: "75%", delay: 1.4 },
  { emoji: "🌟", size: 24, x: "20%", y: "40%", delay: 0.9 },
];

// Animated eyes that follow mouse
const EyeFollower = ({ cx, cy }: { cx: number; cy: number }) => {
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const eyeRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const dist = Math.min(6, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) * 0.02);
      setPupil({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Random blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <g>
      <circle ref={eyeRef} cx={cx} cy={cy} r="14" fill="white" stroke="hsl(262 48% 81%)" strokeWidth="2" />
      {blink ? (
        <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="hsl(262 38% 33%)" strokeWidth="2.5" strokeLinecap="round" />
      ) : (
        <>
          <circle cx={cx + pupil.x} cy={cy + pupil.y} r="7" fill="hsl(262 38% 33%)" />
          <circle cx={cx + pupil.x + 2} cy={cy + pupil.y - 2} r="2.5" fill="white" />
        </>
      )}
    </g>
  );
};

// Typing text animation
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return <>{displayed}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-[2px] h-4 bg-lavender-deep ml-0.5 align-middle" /></>;
};

const Login = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      navigate("/home", { replace: true });
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to verify.");
        setIsLoading(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setShowWelcome(true);
        setTimeout(() => navigate("/home"), 2200);
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple") => {
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result?.error) toast.error(String(result.error));
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    const demoEmail = "serah@wonderead.demo";
    const demoPwd = "wonderead123";
    // Try sign in first, if fails try sign up then sign in
    let { error } = await supabase.auth.signInWithPassword({ email: demoEmail, password: demoPwd });
    if (error) {
      const { error: signUpErr } = await supabase.auth.signUp({
        email: demoEmail,
        password: demoPwd,
        options: { data: { full_name: "Serah" } },
      });
      if (signUpErr) {
        toast.error(signUpErr.message);
        setIsLoading(false);
        return;
      }
      const res = await supabase.auth.signInWithPassword({ email: demoEmail, password: demoPwd });
      if (res.error) {
        toast.error("Demo account created! Please check email or try again.");
        setIsLoading(false);
        return;
      }
    }
    setShowWelcome(true);
    setTimeout(() => navigate("/home"), 2200);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">
      <MagicCursor />
      <FloatingParticles count={10} />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="fixed w-[500px] h-[500px] rounded-full bg-lavender opacity-40 -top-32 -right-24 pointer-events-none blur-2xl"
      />
      <motion.div
        animate={{ x: [0, -25, 20, 0], y: [0, 20, -15, 0], scale: [1, 0.95, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed w-[380px] h-[380px] rounded-full bg-blush opacity-40 -bottom-20 -left-20 pointer-events-none blur-2xl"
      />
      <motion.div
        animate={{ x: [0, 15, -10, 0], y: [0, -15, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed w-[260px] h-[260px] rounded-full bg-mint opacity-30 bottom-48 right-16 pointer-events-none blur-xl"
      />
      <motion.div
        animate={{ x: [0, -10, 15, 0], y: [0, 10, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="fixed w-[200px] h-[200px] rounded-full bg-peach opacity-25 top-20 left-1/4 pointer-events-none blur-xl"
      />

      {/* Floating story icons */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none select-none"
          style={{ left: icon.x, top: icon.y, fontSize: icon.size }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.15, 0.5, 0.15],
            y: [0, -25, 0, 18, 0],
            x: [0, 12, -10, 8, 0],
            rotate: [0, 12, -12, 6, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 5, repeat: Infinity, delay: icon.delay },
            y: { duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: icon.delay },
            x: { duration: 7 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: icon.delay },
            rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: icon.delay },
            scale: { duration: 0.5, delay: icon.delay },
          }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      {/* Welcome overlay - enhanced */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Starburst */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.6, 0], scale: [0, 1.5], x: Math.cos(i * 30 * Math.PI / 180) * 200, y: Math.sin(i * 30 * Math.PI / 180) * 200 }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.05 }}
                className="absolute text-2xl"
              >
                ✨
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: [0, 1.4, 1], rotate: 0 }}
              transition={{ duration: 0.8, times: [0, 0.6, 1] }}
              className="text-[100px] mb-6"
            >
              🐇
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-4xl md:text-5xl font-black text-foreground text-center"
            >
              Welcome back, <span className="text-lavender-deep">Serah!</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-text-soft mt-3 font-body text-base"
            >
              Let's continue your adventure... ✨
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="w-56 h-1.5 bg-gradient-to-r from-lavender-deep via-blush-deep to-peach-deep rounded-full mt-6 origin-left"
            />
            {/* Flying books */}
            {["📖", "📚", "🌟"].map((emoji, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -100, y: 100 }}
                animate={{ opacity: [0, 1, 0], x: 200, y: -100 }}
                transition={{ delay: 1 + i * 0.3, duration: 1.5 }}
                className="absolute text-3xl"
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* Logo with animated eyes */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            className="relative inline-block"
          >
            {/* Bunny face with tracking eyes */}
            <svg width="140" height="140" viewBox="0 0 120 120" className="mx-auto mb-2">
              {/* Ears */}
              <motion.ellipse
                cx="40" cy="20" rx="14" ry="30"
                fill="hsl(336 67% 93%)" stroke="hsl(336 60% 77%)" strokeWidth="2"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "40px 50px" }}
              />
              <motion.ellipse
                cx="80" cy="20" rx="14" ry="30"
                fill="hsl(336 67% 93%)" stroke="hsl(336 60% 77%)" strokeWidth="2"
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{ transformOrigin: "80px 50px" }}
              />
              {/* Inner ears */}
              <ellipse cx="40" cy="18" rx="8" ry="20" fill="hsl(336 60% 85%)" />
              <ellipse cx="80" cy="18" rx="8" ry="20" fill="hsl(336 60% 85%)" />
              {/* Head */}
              <circle cx="60" cy="70" r="38" fill="hsl(42 100% 97.6%)" stroke="hsl(262 48% 81%)" strokeWidth="2.5" />
              {/* Eyes that follow cursor */}
              <EyeFollower cx={47} cy={64} />
              <EyeFollower cx={73} cy={64} />
              {/* Nose */}
              <motion.ellipse
                cx="60" cy="78" rx="4" ry="3"
                fill="hsl(336 60% 77%)"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Mouth */}
              <path d="M54 82 Q60 88 66 82" fill="none" stroke="hsl(262 48% 71%)" strokeWidth="1.5" strokeLinecap="round" />
              {/* Cheeks */}
              <motion.circle
                cx="38" cy="76" r="6" fill="hsl(336 67% 93%)"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="82" cy="76" r="6" fill="hsl(336 67% 93%)"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              {/* Small sparkles around bunny */}
              <motion.text x="15" y="45" fontSize="10" animate={{ opacity: [0, 1, 0], y: [45, 38, 45] }} transition={{ duration: 2, repeat: Infinity }}>✨</motion.text>
              <motion.text x="95" y="50" fontSize="10" animate={{ opacity: [0, 1, 0], y: [50, 43, 50] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}>⭐</motion.text>
            </svg>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl font-black text-foreground tracking-tight"
          >
            Wonder<span className="text-lavender-deep">ead</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-body text-sm text-text-soft mt-2"
          >
            <TypewriterText text="Where every story falls alive ✦" delay={800} />
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card rounded-[28px] shadow-[0_20px_60px_rgba(124,92,184,0.15)] border border-lavender-mid/30 p-8 relative overflow-hidden"
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{ x: [-500, 500] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-lavender/10 to-transparent pointer-events-none z-0"
          />

          <div className="relative z-10">
            <h2 className="font-display text-xl font-bold text-foreground mb-1 flex items-center gap-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
              <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block">✦</motion.span>
            </h2>
            <p className="text-sm text-text-soft mb-6">
              {isSignUp ? "Start your reading adventure" : "Continue your reading journey"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-text-mid mb-1.5 block">Email</label>
                <motion.div
                  animate={focusedField === "email" ? { scale: 1.02 } : { scale: 1 }}
                  className="relative"
                >
                  <motion.span
                    animate={focusedField === "email" ? { rotate: [0, -15, 15, 0], scale: 1.2 } : {}}
                    transition={{ duration: 0.5 }}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base"
                  >
                    📧
                  </motion.span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="serah@wonderland.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-lavender-mid/50 bg-background text-sm text-foreground placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-lavender-deep/30 focus:border-lavender-deep transition-all"
                  />
                </motion.div>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-mid mb-1.5 block">Password</label>
                <motion.div
                  animate={focusedField === "password" ? { scale: 1.02 } : { scale: 1 }}
                  className="relative"
                >
                  <motion.span
                    animate={focusedField === "password" ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? "🔓" : "🔒"}
                  </motion.span>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-lavender-mid/50 bg-background text-sm text-foreground placeholder:text-text-soft focus:outline-none focus:ring-2 focus:ring-lavender-deep/30 focus:border-lavender-deep transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-lavender-deep font-semibold hover:underline"
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </motion.div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ y: -2, boxShadow: "0 12px 36px rgba(124,92,184,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-lavender-deep to-blush-deep text-primary-foreground rounded-xl py-3.5 text-sm font-semibold shadow-[0_6px_24px_rgba(124,92,184,0.35)] transition-all disabled:opacity-70 flex items-center justify-center gap-2 animate-glow"
              >
                {isLoading ? (
                  <motion.div className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="text-lg"
                    >
                      ✨
                    </motion.span>
                    <span>Opening the magic door...</span>
                  </motion.div>
                ) : (
                  <>
                    {isSignUp ? "Create Account" : "Enter Wonderead"}
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>✦</motion.span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-lavender-mid/40" />
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[11px] text-text-soft"
              >
                or continue with
              </motion.span>
              <div className="flex-1 h-px bg-lavender-mid/40" />
            </div>

            {/* Social buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-lavender-mid/50 bg-background text-sm font-medium text-text-mid hover:bg-lavender hover:shadow-sm transition-all disabled:opacity-70"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </motion.button>
              <motion.button
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSocialLogin("apple")}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-lavender-mid/50 bg-background text-sm font-medium text-text-mid hover:bg-lavender hover:shadow-sm transition-all disabled:opacity-70"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple
              </motion.button>
            </div>

            {/* Demo Login */}
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full mt-3 py-3 rounded-xl bg-peach border border-peach-mid/40 text-sm font-semibold text-peach-deep hover:bg-peach-mid/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              🐇 Quick Demo Login (as Serah)
            </motion.button>

            {/* Toggle */}
            <p className="text-center text-xs text-text-soft mt-5">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-lavender-deep font-semibold hover:underline"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Book covers preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <span className="text-[10px] text-text-soft">Stories waiting:</span>
          {["🐇", "🥚", "👸"].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="w-10 h-10 rounded-xl bg-lavender/60 flex items-center justify-center text-lg border border-lavender-mid/30"
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-[10px] text-text-soft mt-4"
        >
          Built with 💜 for Hackathon 2026 · wonderead.tech
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
