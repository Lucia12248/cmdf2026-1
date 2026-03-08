import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { stories } from "@/data/stories";
import { ArrowLeft, BookOpen, Sparkles, Volume2, VolumeX, Eye, Pause, Play, ChevronLeft, ChevronRight, Zap, MessageCircle, HelpCircle, Moon, Sun } from "lucide-react";
import FloatingParticles from "@/components/wonderead/FloatingParticles";
import { Slider } from "@/components/ui/slider";

const bionicWord = (word: string) => {
  const mid = Math.ceil(word.length / 2);
  return { bold: word.slice(0, mid), rest: word.slice(mid) };
};

// Simple word definitions for kids
const wordDefinitions: Record<string, string> = {
  "rabbit-hole": "A deep tunnel where rabbits live 🐇",
  "tunnel": "A long, dark passage underground 🕳️",
  "hookah": "A type of fancy pipe used for smoking 💨",
  "languid": "Moving or speaking slowly and lazily 😴",
  "daisy-chain": "A necklace made by linking daisies together 🌼",
  "hedge": "A row of bushes or small trees forming a wall 🌿",
  "enchanted": "Under a magical spell ✨",
  "perch": "A high place to sit on 🪺",
  "cascade": "A waterfall of something flowing down 🌊",
  "dormouse": "A tiny, sleepy mouse 🐭",
  "patrol": "Walking around to guard an area 🛡️",
  "impossibly": "Something that seems like it can't be real 🤯",
  "adventurer": "Someone who goes on exciting journeys ⚔️",
  "tradition": "Something people do every year 🎊",
  "lanterns": "Beautiful paper lights that glow 🏮",
};

// Mood-based floating emojis
const moodEmojis: Record<string, string[]> = {
  Curious: ["🔍", "❓", "🌀", "💭"],
  Mysterious: ["🌙", "✨", "🕯️", "🔮"],
  Whimsical: ["🍄", "🦋", "🌸", "🎭"],
  Joyful: ["🎉", "😄", "🌟", "🎊"],
  Dreamy: ["☁️", "💫", "🌈", "🌙"],
  Tense: ["⚡", "💥", "🌪️", "😰"],
  Magical: ["✨", "🏮", "🌟", "💜"],
};

// Scene quiz questions
const sceneQuizzes: Record<string, { question: string; options: string[]; answer: number }[]> = {
  "alice-in-wonderland": [
    { question: "What color were the Rabbit's eyes?", options: ["Blue", "Pink", "Green", "Brown"], answer: 1 },
    { question: "What was Alice considering making?", options: ["A cake", "A daisy-chain", "A hat", "A painting"], answer: 1 },
    { question: "What did the Caterpillar take out of its mouth?", options: ["A cookie", "A hookah", "A wand", "A book"], answer: 1 },
    { question: "Who was fast asleep at the tea party?", options: ["Alice", "The Hatter", "The Dormouse", "The Rabbit"], answer: 2 },
  ],
  "humpty-dumpty": [
    { question: "Where was Humpty Dumpty sitting?", options: ["A tree", "A wall", "A chair", "A hill"], answer: 1 },
    { question: "What caused Humpty to fall?", options: ["Rain", "A gust of wind", "A bird", "He jumped"], answer: 1 },
    { question: "Who came to help Humpty?", options: ["The queen", "The king's men", "His friends", "Nobody"], answer: 1 },
  ],
  "tangled": [
    { question: "Where did Rapunzel live?", options: ["A castle", "A cave", "A tower", "A cottage"], answer: 2 },
    { question: "What was the stranger's name?", options: ["Jack", "Flynn", "Hans", "Eric"], answer: 1 },
    { question: "What floated into the sky?", options: ["Balloons", "Kites", "Lanterns", "Stars"], answer: 2 },
  ],
  "three-little-pigs": [
    { question: "What did the first pig build with?", options: ["Bricks", "Straw", "Wood", "Stone"], answer: 1 },
    { question: "Who blew the houses down?", options: ["A bear", "The wolf", "The wind", "A dragon"], answer: 1 },
    { question: "What was in the pot at the end?", options: ["Water", "Hot soup", "Gold", "Nothing"], answer: 1 },
  ],
  "goldilocks": [
    { question: "How many bears lived in the cottage?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
    { question: "Whose porridge was 'just right'?", options: ["Papa's", "Mama's", "Baby's", "Nobody's"], answer: 2 },
    { question: "How did Goldilocks escape?", options: ["The door", "The window", "She hid", "She didn't"], answer: 1 },
  ],
  "jack-and-beanstalk": [
    { question: "What did Jack trade for magic beans?", options: ["A horse", "A cow", "A goat", "Gold"], answer: 1 },
    { question: "Where did Jack hide from the giant?", options: ["Under a bed", "In a teacup", "Behind a door", "In a closet"], answer: 1 },
    { question: "What did Jack grab before escaping?", options: ["Gold coins", "A hen", "A golden harp", "A sword"], answer: 2 },
  ],
  "little-mermaid": [
    { question: "What was Marina's special gift?", options: ["Her tail", "Her voice", "Her hair", "Her eyes"], answer: 1 },
    { question: "Who did Marina rescue?", options: ["A sailor", "A prince", "A fish", "A dolphin"], answer: 1 },
    { question: "What did Marina choose in the end?", options: ["Legs", "To keep her voice", "The prince", "A crown"], answer: 1 },
  ],
};

const StoryReader = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const story = stories.find((s) => s.id === storyId);

  const [currentScene, setCurrentScene] = useState(0);
  const [bionicMode, setBionicMode] = useState(true);
  const [wordTrackingEnabled, setWordTrackingEnabled] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSceneSelector, setShowSceneSelector] = useState(false);
  const [sceneComplete, setSceneComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(520); // ms per word
  const [tappedWord, setTappedWord] = useState<{ word: string; def: string; idx: number } | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [wordsRead, setWordsRead] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scene = story ? story.scenes[currentScene] : null;
  const words = scene ? scene.text.split(/\s+/) : [];
  const currentMoodEmojis = scene ? (moodEmojis[scene.mood] || moodEmojis.Curious) : [];
  const quiz = storyId ? sceneQuizzes[storyId]?.[currentScene] : null;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Text-to-Speech via ElevenLabs
  const speak = useCallback(async (text: string) => {
    if (!audioEnabled) return;
    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );
      if (!response.ok) {
        throw new Error("TTS request failed");
      }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      await audio.play();
    } catch (err) {
      console.error("ElevenLabs TTS error:", err);
      setIsSpeaking(false);
    }
  }, [audioEnabled]);

  const stopSpeech = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const startTracking = useCallback(() => {
    setIsPlaying(true);
    setCurrentWordIndex(0);
    if (audioEnabled && scene) {
      speak(scene.text);
    }
  }, [audioEnabled, scene, speak]);

  const stopTracking = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    stopSpeech();
  }, [stopSpeech]);

  useEffect(() => {
    if (isPlaying && wordTrackingEnabled) {
      intervalRef.current = setInterval(() => {
        setCurrentWordIndex((prev) => {
          if (prev >= words.length - 1) {
            stopTracking();
            setSceneComplete(true);
            setWordsRead(w => w + words.length);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 2500);
            return prev;
          }
          return prev + 1;
        });
      }, readingSpeed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, wordTrackingEnabled, words.length, stopTracking, readingSpeed]);

  useEffect(() => {
    setCurrentWordIndex(-1);
    setIsPlaying(false);
    setSceneComplete(false);
    setShowQuiz(false);
    setQuizAnswer(null);
    setTappedWord(null);
    stopSpeech();
  }, [currentScene, stopSpeech]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (!story || !scene) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <p className="text-text-mid font-display text-lg">Story not found</p>
          <button onClick={() => navigate("/home")} className="mt-4 text-lavender-deep underline text-sm">Go home</button>
        </motion.div>
      </div>
    );
  }

  const handleWordTap = (word: string, idx: number) => {
    const cleanWord = word.toLowerCase().replace(/[^a-z-]/g, "");
    const def = wordDefinitions[cleanWord];
    if (def) {
      setTappedWord({ word: cleanWord, def, idx });
      setTimeout(() => setTappedWord(null), 3000);
    }
  };

  const goNextScene = () => {
    if (currentScene < story.scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  const goPrevScene = () => {
    if (currentScene > 0) setCurrentScene(currentScene - 1);
  };

  const progress = ((currentScene + 1) / story.scenes.length) * 100;
  const wordProgress = words.length > 0 ? Math.max(0, ((currentWordIndex + 1) / words.length) * 100) : 0;

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      nightMode
        ? "bg-[#1a1625]"
        : "bg-gradient-to-b from-lavender/15 via-background to-mint/10"
    }`}>
      {!nightMode && <FloatingParticles count={10} />}

      {/* Decorative pastel orbs — hidden in night mode */}
      {!nightMode && (
        <>
          <div className="fixed w-[350px] h-[350px] rounded-full bg-lavender/25 blur-3xl -top-20 -left-20 pointer-events-none z-0" />
          <div className="fixed w-[300px] h-[300px] rounded-full bg-mint/20 blur-3xl -bottom-16 -right-16 pointer-events-none z-0" />
          <div className="fixed w-[220px] h-[220px] rounded-full bg-lavender-mid/12 blur-2xl top-1/3 right-10 pointer-events-none z-0" />
          <div className="fixed w-[180px] h-[180px] rounded-full bg-blush/15 blur-2xl bottom-1/3 left-10 pointer-events-none z-0" />
        </>
      )}
      {nightMode && (
        <>
          <div className="fixed w-[350px] h-[350px] rounded-full bg-indigo-900/20 blur-3xl -top-20 -left-20 pointer-events-none z-0" />
          <div className="fixed w-[300px] h-[300px] rounded-full bg-purple-900/15 blur-3xl -bottom-16 -right-16 pointer-events-none z-0" />
        </>
      )}

      {/* Mood-based animated background */}
      <motion.div
        key={scene.mood}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        className={`fixed inset-0 bg-gradient-to-br ${scene.gradient} pointer-events-none z-0`}
      />

      {/* Confetti burst */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-[60]">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: "50%", y: "40%", scale: 0 }}
                animate={{
                  opacity: 0,
                  x: `${15 + Math.random() * 70}%`,
                  y: `${Math.random() * 80}%`,
                  scale: [0, 1.5, 0.8],
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                className="absolute text-xl"
              >
                {["⭐", "🌟", "✨", "💜", "🎉", "🦋", "📖", "🌿", "💫"][i % 9]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b px-4 md:px-8 py-3 flex items-center gap-3 transition-colors duration-500 ${
        nightMode
          ? "bg-[#1a1625]/90 border-purple-900/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "bg-gradient-to-r from-lavender/40 via-background/85 to-mint/30 border-lavender-mid/25 shadow-[0_4px_20px_rgba(124,92,184,0.1)]"
      }`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/home")}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            nightMode ? "bg-purple-900/40 text-purple-300 hover:bg-purple-900/60" : "bg-lavender/60 text-lavender-deep hover:bg-lavender"
          }`}
        >
          <ArrowLeft size={18} />
        </motion.button>
        <div className="flex-1 min-w-0">
          <div className={`font-display text-base font-bold truncate flex items-center gap-2 ${nightMode ? "text-purple-100" : "text-foreground"}`}>
            {story.title}
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm"
            >
              {story.cover}
            </motion.span>
          </div>
          <div className={`text-[10px] flex items-center gap-1 ${nightMode ? "text-purple-300/60" : "text-text-soft"}`}>
            Scene {currentScene + 1} of {story.scenes.length}
            <span className={`inline-block w-1 h-1 rounded-full ${nightMode ? "bg-purple-400/40" : "bg-lavender-mid"}`} />
            <span className={`font-semibold ${nightMode ? "text-purple-300" : "text-lavender-deep"}`}>{wordsRead} words read</span>
          </div>
        </div>
        <div className="flex gap-2">
          {/* Night mode toggle */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setNightMode(!nightMode)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              nightMode ? "bg-yellow-500/20 text-yellow-300" : "bg-indigo-100 text-indigo-500"
            }`}
            title="Night Mode"
          >
            {nightMode ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              nightMode
                ? audioEnabled ? "bg-teal-900/50 text-teal-300" : "bg-purple-900/40 text-purple-400"
                : audioEnabled ? "bg-mint/70 text-mint-deep" : "bg-lavender/50 text-text-soft"
            }`}
            title="Toggle Audio"
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setBionicMode(!bionicMode)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all ${
              nightMode
                ? bionicMode ? "bg-teal-900/50 text-teal-300 shadow-sm" : "bg-purple-900/40 text-purple-400"
                : bionicMode ? "bg-mint/70 text-mint-deep shadow-sm" : "bg-lavender/50 text-lavender-deep"
            }`}
            title="ADHD Mode"
          >
            🧠
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setWordTrackingEnabled(!wordTrackingEnabled)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all ${
              nightMode
                ? wordTrackingEnabled ? "bg-purple-600/50 text-purple-200 shadow-sm" : "bg-purple-900/40 text-purple-400"
                : wordTrackingEnabled ? "bg-lavender-deep/80 text-primary-foreground shadow-sm" : "bg-lavender/50 text-lavender-deep"
            }`}
            title="Word Tracking"
          >
            <Eye size={16} />
          </motion.button>
        </div>
      </nav>

      <div className="max-w-[640px] mx-auto px-4 md:px-8 py-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`scene-${currentScene}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
          >
            {/* Scene illustration with floating mood emojis */}
            <div className={`bg-gradient-to-br ${scene.gradient} rounded-[24px] h-[200px] md:h-[240px] flex items-center justify-center relative overflow-hidden mb-4 border-2 shadow-[0_12px_40px_rgba(124,92,184,0.15)] ${
              nightMode ? "border-purple-800/40 brightness-75" : "border-lavender/40"
            }`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-lavender/25 via-transparent to-mint/25 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-lavender/30 to-transparent pointer-events-none" />
              {currentMoodEmojis.map((emoji, i) => (
                <motion.span
                  key={`${scene.mood}-${i}`}
                  className="absolute text-2xl pointer-events-none"
                  style={{ left: `${15 + i * 22}%`, top: `${20 + (i % 2) * 40}%` }}
                  animate={{
                    y: [0, -15, 0, 10, 0],
                    x: [0, 8, -5, 3, 0],
                    rotate: [0, 10, -10, 5, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
                >
                  {emoji}
                </motion.span>
              ))}

              <motion.span
                animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-[80px] relative z-10 drop-shadow-lg"
              >
                {scene.emoji}
              </motion.span>

              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-3 left-4 bg-card/90 backdrop-blur-lg rounded-xl px-3 py-1.5 text-[10px] text-foreground font-medium flex items-center gap-1.5 shadow-sm"
              >
                {scene.setting}
              </motion.span>

              <motion.span
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`absolute top-3 right-4 ${scene.moodColor} rounded-full px-3 py-1.5 text-[10px] font-bold flex items-center gap-1 shadow-sm`}
              >
                <Sparkles size={10} /> {scene.mood}
              </motion.span>
            </div>

            {/* Scene name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-3"
            >
              <h2 className={`font-display text-lg font-bold flex items-center gap-2 ${nightMode ? "text-purple-100" : "text-foreground"}`}>
                <span className="text-xl">{scene.emoji}</span> {scene.name}
              </h2>
              <span className={`text-[10px] rounded-full px-2.5 py-1 font-medium ${
                nightMode ? "text-purple-300 bg-purple-900/40" : "text-lavender-deep bg-lavender/50"
              }`}>
                {words.length} words
              </span>
            </motion.div>

            {/* Scene Video */}
            {scene.videoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-4 rounded-[20px] overflow-hidden border-2 border-lavender/30 shadow-[0_8px_30px_rgba(124,92,184,0.12)] relative"
              >
                <div className="absolute top-3 left-3 z-10 bg-card/90 backdrop-blur-sm rounded-xl px-2.5 py-1 text-[10px] font-bold text-lavender-deep flex items-center gap-1">
                  🎬 Scene {currentScene + 1}
                </div>
                <video
                  key={scene.videoUrl}
                  src={scene.videoUrl}
                  className="w-full aspect-video object-cover"
                  controls
                  playsInline
                  muted
                  autoPlay
                  loop
                />
              </motion.div>
            )}

            {/* Scene progress pills */}
            <div className="flex gap-1.5 mb-4">
              {story.scenes.map((s, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scaleY: 2 }}
                  onClick={() => setCurrentScene(i)}
                  className={`flex-1 h-2 rounded-full transition-all cursor-pointer ${
                    i === currentScene
                      ? "bg-gradient-to-r from-lavender-deep to-mint-deep"
                      : i < currentScene
                      ? "bg-lavender-mid"
                      : "bg-lavender/50"
                  }`}
                />
              ))}
            </div>

            {/* Controls row */}
            <div className="flex gap-2 mb-4">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setBionicMode(!bionicMode)}
                className={`flex-1 py-2.5 rounded-xl text-[11px] font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  bionicMode
                    ? "bg-mint-deep/90 text-primary-foreground border-mint-deep shadow-[0_4px_16px_rgba(58,158,126,0.25)]"
                    : "bg-transparent text-mint-deep border-mint-mid/50 hover:bg-mint/30"
                }`}
              >
                🧠 Bionic
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setWordTrackingEnabled(!wordTrackingEnabled)}
                className={`flex-1 py-2.5 rounded-xl text-[11px] font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  wordTrackingEnabled
                    ? "bg-lavender-deep/90 text-primary-foreground border-lavender-deep shadow-[0_4px_16px_rgba(124,92,184,0.25)]"
                    : "bg-transparent text-lavender-deep border-lavender-mid/50 hover:bg-lavender/30"
                }`}
              >
                <Eye size={12} /> Tracking
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`flex-1 py-2.5 rounded-xl text-[11px] font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  audioEnabled
                    ? "bg-blush-deep/90 text-primary-foreground border-blush-deep shadow-[0_4px_16px_rgba(190,90,130,0.25)]"
                    : "bg-transparent text-blush-deep border-blush-mid/50 hover:bg-blush/30"
                }`}
              >
                {audioEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />} Audio
              </motion.button>
            </div>

            {/* Reading speed slider */}
            <div className={`rounded-2xl px-4 py-3 mb-4 border transition-colors duration-500 ${
              nightMode ? "bg-purple-900/25 border-purple-800/30" : "bg-lavender/20 border-lavender/30"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-semibold flex items-center gap-1.5 ${nightMode ? "text-purple-300" : "text-lavender-deep"}`}>
                  <Zap size={12} /> Reading Speed
                </span>
                <span className={`text-[10px] rounded-full px-2 py-0.5 ${nightMode ? "text-purple-300 bg-purple-900/40" : "text-text-soft bg-card"}`}>
                  {readingSpeed <= 250 ? "🐇 Fast" : readingSpeed <= 400 ? "🚶 Steady" : "🐢 Slow"}
                </span>
              </div>
              <Slider
                value={[readingSpeed]}
                onValueChange={(v) => setReadingSpeed(v[0])}
                min={180}
                max={600}
                step={20}
                className="w-full"
              />
              <div className="flex justify-between mt-1">
                <span className={`text-[9px] ${nightMode ? "text-purple-400/60" : "text-text-soft"}`}>Fast 🐇</span>
                <span className={`text-[9px] ${nightMode ? "text-purple-400/60" : "text-text-soft"}`}>🐢 Slow</span>
              </div>
            </div>

            {/* Word definition popup */}
            <AnimatePresence>
              {tappedWord && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="bg-gradient-to-r from-lavender/60 to-mint/50 rounded-2xl px-5 py-3 mb-3 border border-lavender-mid/30 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle size={14} className="text-lavender-deep" />
                    <span className="font-display text-sm font-bold text-lavender-deep capitalize">{tappedWord.word}</span>
                  </div>
                  <p className="text-[12px] text-text-mid font-body">{tappedWord.def}</p>
                  <p className="text-[9px] text-text-soft mt-1 italic">Tap highlighted words to learn their meaning!</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Story text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-[22px] p-5 md:p-7 mb-4 border-2 relative overflow-hidden transition-colors duration-500 ${
                nightMode
                  ? "bg-[#221d30] border-purple-800/30 shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                  : "bg-gradient-to-br from-card via-card to-lavender/15 border-lavender/30 shadow-[0_12px_40px_rgba(124,92,184,0.1)]"
              }`}
            >
              {/* Reading progress shimmer */}
              {isPlaying && (
                <motion.div
                  className={`absolute top-0 left-0 h-1.5 rounded-full ${
                    nightMode
                      ? "bg-gradient-to-r from-purple-500 via-teal-400 to-purple-500"
                      : "bg-gradient-to-r from-lavender-deep via-mint-deep to-lavender-deep"
                  }`}
                  style={{ width: `${wordProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              )}

              <p className={`font-body text-[15px] md:text-[17px] leading-[2.4] ${
                nightMode ? "text-purple-200/80 selection:bg-purple-800 selection:text-purple-100" : "text-text-mid selection:bg-lavender selection:text-lavender-deep"
              }`}>
                {words.map((word, i) => {
                  const isTracked = wordTrackingEnabled && i === currentWordIndex;
                  const isPast = wordTrackingEnabled && i < currentWordIndex && currentWordIndex >= 0;
                  const cleanWord = word.toLowerCase().replace(/[^a-z-]/g, "");
                  const hasDef = !!wordDefinitions[cleanWord];

                  if (bionicMode) {
                    const { bold, rest } = bionicWord(word);
                    return (
                      <span key={i}>
                        <motion.span
                          onClick={() => handleWordTap(word, i)}
                          className={`inline-block transition-all duration-200 cursor-pointer ${
                            isTracked
                              ? nightMode
                                ? "bg-teal-500/30 rounded-lg px-1.5 py-0.5 text-teal-300 font-bold scale-105 shadow-[0_0_12px_rgba(45,212,191,0.3)]"
                                : "bg-mint/50 rounded-lg px-1.5 py-0.5 text-mint-deep font-bold scale-105 shadow-[0_0_12px_rgba(58,158,126,0.3)]"
                              : isPast
                              ? "opacity-50"
                              : hasDef
                              ? nightMode
                                ? "underline decoration-dotted decoration-purple-400/60 hover:bg-purple-800/30 rounded"
                                : "underline decoration-dotted decoration-lavender-mid/60 hover:bg-lavender/30 rounded"
                              : nightMode
                              ? "hover:bg-purple-800/20 rounded"
                              : "hover:bg-lavender/15 rounded"
                          }`}
                          animate={isTracked ? { scale: [1, 1.08, 1] } : {}}
                          transition={{ duration: 0.25 }}
                        >
                          <span className={`font-extrabold ${nightMode ? "text-purple-100" : "text-foreground"}`}>{bold}</span>
                          {rest}
                        </motion.span>
                        <span className="inline-block w-[6px]" />
                      </span>
                    );
                  }
                  return (
                    <span key={i}>
                      <motion.span
                        onClick={() => handleWordTap(word, i)}
                        className={`inline-block transition-all duration-200 cursor-pointer ${
                          isTracked
                            ? nightMode
                              ? "bg-teal-500/30 rounded-lg px-1.5 py-0.5 text-teal-300 font-bold shadow-[0_0_12px_rgba(45,212,191,0.3)]"
                              : "bg-mint/50 rounded-lg px-1.5 py-0.5 text-mint-deep font-bold shadow-[0_0_12px_rgba(58,158,126,0.3)]"
                            : isPast
                            ? "opacity-50"
                            : hasDef
                            ? nightMode
                              ? "underline decoration-dotted decoration-purple-400/60 hover:bg-purple-800/30 rounded"
                              : "underline decoration-dotted decoration-lavender-mid/60 hover:bg-lavender/30 rounded"
                            : nightMode
                            ? "hover:bg-purple-800/20 rounded"
                            : "hover:bg-lavender/15 rounded"
                        }`}
                      >
                        {word}
                      </motion.span>
                      <span className="inline-block w-[6px]" />
                    </span>
                  );
                })}
              </p>

              {/* Tap hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-[9px] text-text-soft mt-4 text-center italic"
              >
                💡 Tap any dotted-underline word to see its meaning
              </motion.p>
            </motion.div>

            {/* Scene complete celebration */}
            <AnimatePresence>
              {sceneComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gradient-to-r from-mint/40 via-lavender/30 to-mint/40 rounded-2xl px-5 py-4 mb-4 border border-mint-mid/25 text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: 2 }}
                    className="text-3xl mb-2"
                  >
                    🎉
                  </motion.div>
                  <div className="font-display text-sm font-bold text-foreground">Scene Complete!</div>
                  <div className="text-[11px] text-text-mid mt-1">+15 XP earned · {words.length} words read!</div>

                  {quiz && !showQuiz && (
                    <motion.button
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowQuiz(true)}
                      className="mt-3 bg-lavender-deep/90 text-primary-foreground rounded-xl px-5 py-2 text-[12px] font-bold inline-flex items-center gap-1.5 shadow-md"
                    >
                      <HelpCircle size={14} /> Take the Quiz! +10 XP
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quiz */}
            <AnimatePresence>
              {showQuiz && quiz && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gradient-to-br from-lavender/40 to-mint/30 rounded-2xl p-5 mb-4 border-2 border-lavender-mid/30 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <HelpCircle size={16} className="text-lavender-deep" />
                    <span className="font-display text-sm font-bold text-foreground">Quick Quiz!</span>
                  </div>
                  <p className="text-[13px] text-text-mid font-body mb-4">{quiz.question}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quiz.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setQuizAnswer(i)}
                        disabled={quizAnswer !== null}
                        className={`py-3 px-4 rounded-xl text-[12px] font-semibold border-2 transition-all ${
                          quizAnswer === null
                            ? "bg-card border-lavender/40 text-foreground hover:border-lavender-deep hover:bg-lavender/20"
                            : i === quiz.answer
                            ? "bg-mint/50 border-mint-deep text-mint-deep"
                            : quizAnswer === i
                            ? "bg-blush/50 border-blush-deep text-blush-deep"
                            : "bg-card border-lavender/30 text-text-soft opacity-50"
                        }`}
                      >
                        {opt} {quizAnswer !== null && i === quiz.answer && "✅"} {quizAnswer === i && i !== quiz.answer && "❌"}
                      </motion.button>
                    ))}
                  </div>
                  {quizAnswer !== null && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-center text-[12px] font-bold mt-3 ${
                        quizAnswer === quiz.answer ? "text-mint-deep" : "text-blush-deep"
                      }`}
                    >
                      {quizAnswer === quiz.answer ? "🎉 Correct! +10 XP" : `Not quite! The answer is "${quiz.options[quiz.answer]}"`}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Play bar - more pastel purple/mint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-[20px] p-4 flex items-center gap-3 border-2 mb-4 transition-colors duration-500 ${
            nightMode
              ? "bg-[#221d30] border-purple-800/30 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              : "bg-gradient-to-r from-lavender/30 via-card to-mint/25 border-lavender/30 shadow-[0_8px_30px_rgba(124,92,184,0.12)]"
          }`}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (isPlaying) stopTracking();
              else startTracking();
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-primary-foreground shadow-lg shrink-0 transition-all ${
              isPlaying
                ? nightMode ? "bg-gradient-to-br from-pink-600 to-purple-600" : "bg-gradient-to-br from-blush-deep to-lavender-deep"
                : nightMode ? "bg-gradient-to-br from-purple-600 to-teal-500" : "bg-gradient-to-br from-lavender-deep to-mint-deep animate-glow"
            }`}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </motion.button>
          <div className="flex-1 min-w-0">
            <div className={`text-[12px] font-semibold truncate flex items-center gap-1.5 ${nightMode ? "text-purple-100" : "text-foreground"}`}>
              <BookOpen size={12} />
              Scene {currentScene + 1} — {scene.name}
            </div>
            <div className={`text-[10px] flex items-center gap-1 ${nightMode ? "text-purple-300/60" : "text-text-soft"}`}>
              {audioEnabled ? (
                <><Volume2 size={9} className={nightMode ? "text-teal-400" : "text-mint-deep"} /> Read-aloud {isSpeaking ? "playing..." : "ready"}</>
              ) : (
                <><VolumeX size={9} /> Audio off</>
              )}
            </div>
            <div className={`h-1.5 rounded-full mt-2 overflow-hidden ${nightMode ? "bg-purple-900/40" : "bg-lavender/40"}`}>
              <motion.div
                className={`h-full rounded-full ${
                  nightMode ? "bg-gradient-to-r from-purple-500 via-teal-400 to-purple-500" : "bg-gradient-to-r from-lavender-deep via-mint-deep to-lavender-deep"
                }`}
                style={{ width: `${wordProgress > 0 ? wordProgress : progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 10 }}
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`text-xl p-1 rounded-full transition-colors ${
              nightMode
                ? audioEnabled ? "bg-teal-900/30" : "bg-purple-900/30"
                : audioEnabled ? "bg-mint/30" : "bg-lavender/20"
            }`}
            title="Toggle Audio"
          >
            {audioEnabled ? "🔊" : "🔇"}
          </motion.button>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={goPrevScene}
            disabled={currentScene === 0}
            className={`flex-1 py-3.5 rounded-xl text-sm font-semibold border transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 ${
              nightMode ? "border-purple-800/40 text-purple-300 bg-[#221d30] hover:bg-purple-900/30" : "border-lavender-mid/40 text-text-mid bg-card hover:bg-lavender/30"
            }`}
          >
            <ChevronLeft size={16} /> Previous
          </motion.button>
          <motion.button
            whileHover={{ x: 3, boxShadow: "0 8px 24px rgba(124,92,184,0.25)" }}
            whileTap={{ scale: 0.97 }}
            onClick={goNextScene}
            disabled={currentScene === story.scenes.length - 1}
            className={`flex-1 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 ${
              nightMode ? "bg-gradient-to-r from-purple-600 to-teal-500 shadow-[0_4px_16px_rgba(139,92,246,0.3)]" : "bg-gradient-to-r from-lavender-deep to-mint-deep shadow-[0_4px_16px_rgba(124,92,184,0.25)]"
            }`}
          >
            Next Scene <ChevronRight size={16} />
          </motion.button>
        </div>

        {/* Scene selector */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSceneSelector(!showSceneSelector)}
          className="w-full mt-4 py-3 text-[11px] font-semibold text-lavender-deep bg-lavender/30 rounded-xl hover:bg-lavender/50 transition-colors flex items-center justify-center gap-1.5 border border-lavender/30"
        >
          <BookOpen size={12} />
          {showSceneSelector ? "Hide Scenes ▲" : "Browse All Scenes ▼"}
        </motion.button>

        <AnimatePresence>
          {showSceneSelector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 mt-3">
                {story.scenes.map((s, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentScene(i);
                      setShowSceneSelector(false);
                    }}
                    className={`bg-card rounded-2xl overflow-hidden border-2 transition-all text-left ${
                      i === currentScene
                        ? "border-lavender-deep shadow-[0_0_0_3px_rgba(124,92,184,0.12)]"
                        : "border-lavender/20 hover:border-lavender-mid"
                    }`}
                  >
                    <div className={`h-20 bg-gradient-to-br ${s.gradient} flex items-center justify-center text-3xl relative`}>
                      <motion.span animate={i === currentScene ? { y: [0, -5, 0] } : {}} transition={{ duration: 2, repeat: Infinity }}>
                        {s.emoji}
                      </motion.span>
                      {i < currentScene && (
                        <span className="absolute top-2 right-2 text-xs bg-card/80 rounded-full px-1.5 py-0.5">✅</span>
                      )}
                      {i === currentScene && (
                        <span className="absolute top-2 right-2 text-xs bg-lavender-deep text-primary-foreground rounded-full px-1.5 py-0.5 font-bold">NOW</span>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="font-display text-[11px] font-bold text-foreground">{s.name}</div>
                      <div className="text-[9px] text-text-soft mt-0.5">{s.setting}</div>
                      <div className={`text-[8px] font-semibold mt-1 ${s.moodColor} rounded-full px-2 py-0.5 inline-block`}>
                        {s.mood}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fun tip at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-lavender/30 via-mint/20 to-lavender/30 rounded-2xl px-5 py-2.5 border border-lavender/25 shadow-sm">
            <span className="text-[10px] text-lavender-deep font-body italic">
              💡 Tip: Tap words with dotted underlines to discover their meanings!
            </span>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <div className="mt-4 flex justify-center gap-2 opacity-40">
          {["🌿", "💜", "✨", "🍃", "💫"].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
              className="text-sm"
            >
              {e}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryReader;
