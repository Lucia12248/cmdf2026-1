import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, X, Pencil } from "lucide-react";

interface Note {
  id: number;
  title: string;
  text: string;
  emoji: string;
  color: string;
  date: string;
}

const defaultNotes: Note[] = [
  {
    id: 1,
    title: "Alice is SO brave!!",
    text: "She jumped into a hole just because she saw a bunny!! I would NEVER do that... but also maybe I would if the bunny was cute enough 🐰",
    emoji: "🐇",
    color: "bg-lavender",
    date: "Today",
  },
  {
    id: 2,
    title: "The Caterpillar is weird",
    text: "Why does he keep asking 'who are you?' like... she's ALICE!! Duh!! Also mushrooms that make you big or small? I want one!!!",
    emoji: "🍄",
    color: "bg-mint",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Tea Party = CHAOS",
    text: "The Mad Hatter is sooo funny!! He just says random things and everyone acts like it's normal. My kind of party tbh 🎉🫖",
    emoji: "🫖",
    color: "bg-peach",
    date: "2 days ago",
  },
  {
    id: 4,
    title: "Humpty Dumpty is sad",
    text: "Why couldn't the king's men fix him?? They had HORSES! Horses are strong!! This story made me a little sad but also eggs are fragile so...",
    emoji: "🥚",
    color: "bg-blush",
    date: "3 days ago",
  },
  {
    id: 5,
    title: "Rapunzel's hair goals",
    text: "70 FEET OF HAIR?? How does she wash it?? I can barely brush my hair without crying. Also Flynn is funny hehe 😄",
    emoji: "👸",
    color: "bg-lavender",
    date: "Last week",
  },
];

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>(defaultNotes);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("📝");

  const emojiOptions = ["📝", "🐇", "🍄", "🏰", "🌟", "💜", "🦋", "🎨"];
  const colorOptions = ["bg-lavender", "bg-mint", "bg-peach", "bg-blush"];

  const addNote = () => {
    if (!newTitle.trim()) return;
    setNotes([
      {
        id: Date.now(),
        title: newTitle,
        text: newText,
        emoji: selectedEmoji,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        date: "Just now",
      },
      ...notes,
    ]);
    setNewTitle("");
    setNewText("");
    setShowNew(false);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender/20 via-background to-mint/15 relative overflow-hidden">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/85 border-b border-lavender-mid/30 px-5 md:px-10 py-3.5 flex items-center gap-3">
        <button onClick={() => navigate("/home")} className="text-text-mid hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <Pencil size={18} className="text-mint-deep" /> Serah's Notes
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNew(true)}
          className="ml-auto w-9 h-9 rounded-full bg-lavender-deep flex items-center justify-center text-primary-foreground shadow-[0_4px_12px_rgba(124,92,184,0.3)]"
        >
          <Plus size={18} />
        </motion.button>
      </nav>

      <div className="max-w-[700px] mx-auto px-5 md:px-10 py-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-body text-sm text-text-soft mb-6 italic"
        >
          "Write down your thoughts about the stories you read!" ✏️
        </motion.p>

        {/* New note form */}
        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-card rounded-[22px] border-2 border-dashed border-lavender-mid p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-foreground">New Note ✨</span>
                  <button onClick={() => setShowNew(false)} className="text-text-soft hover:text-foreground">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex gap-2 mb-3">
                  {emojiOptions.map((e) => (
                    <button
                      key={e}
                      onClick={() => setSelectedEmoji(e)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all ${
                        selectedEmoji === e ? "bg-lavender scale-110 ring-2 ring-lavender-deep" : "bg-background hover:bg-lavender/50"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Give your note a fun title..."
                  className="w-full px-3 py-2 rounded-xl border border-lavender-mid/50 bg-background text-sm text-foreground placeholder:text-text-soft mb-2 focus:outline-none focus:ring-2 focus:ring-lavender-deep/30"
                />
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="What are you thinking about? Write anything!"
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-lavender-mid/50 bg-background text-sm text-foreground placeholder:text-text-soft mb-3 focus:outline-none focus:ring-2 focus:ring-lavender-deep/30 resize-none"
                />
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={addNote}
                  className="w-full bg-lavender-deep text-primary-foreground rounded-xl py-2.5 text-sm font-semibold"
                >
                  Save Note ✦
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes grid */}
        <div className="columns-1 sm:columns-2 gap-4 space-y-4">
          {notes.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              layout
              className={`${note.color} rounded-[20px] p-5 break-inside-avoid relative group`}
            >
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-card/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
              <div className="text-2xl mb-2">{note.emoji}</div>
              <h3 className="font-display text-base font-bold text-foreground mb-1.5">{note.title}</h3>
              <p className="font-body text-[13px] text-text-mid leading-relaxed">{note.text}</p>
              <div className="text-[10px] text-text-soft mt-3">{note.date}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
