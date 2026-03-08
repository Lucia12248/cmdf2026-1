export interface Scene {
  id: number;
  name: string;
  emoji: string;
  setting: string;
  mood: string;
  moodColor: string;
  gradient: string;
  text: string;
  videoUrl?: string;
}

export interface Story {
  id: string;
  title: string;
  cover: string;
  coverImage: string;
  author: string;
  scenes: Scene[];
  progress: number;
  lastScene: number;
}

// Video imports
import aliceScene1 from "@/assets/videos/alice-scene1.mp4";
import aliceScene2 from "@/assets/videos/alice-scene2.mp4";
import aliceScene3 from "@/assets/videos/alice-scene3.mp4";
import aliceScene4 from "@/assets/videos/alice-scene4.mp4";
import humptyScene1 from "@/assets/videos/humpty-scene1.mp4";
import humptyScene2 from "@/assets/videos/humpty-scene2.mp4";
import humptyScene3 from "@/assets/videos/humpty-scene3.mp4";
import tangledScene1 from "@/assets/videos/tangled-scene1.mp4";
import tangledScene2 from "@/assets/videos/tangled-scene2.mp4";
import tangledScene3 from "@/assets/videos/tangled-scene3.mp4";
import pigsScene1 from "@/assets/videos/pigs-scene1.mp4";
import pigsScene2 from "@/assets/videos/pigs-scene2.mp4";
import pigsScene3 from "@/assets/videos/pigs-scene3.mp4";
import goldilocksScene1 from "@/assets/videos/goldilocks-scene1.mp4";
import goldilocksScene2 from "@/assets/videos/goldilocks-scene2.mp4";
import goldilocksScene3 from "@/assets/videos/goldilocks-scene3.mp4";
import jackScene1 from "@/assets/videos/jack-scene1.mp4";
import jackScene2 from "@/assets/videos/jack-scene2.mp4";
import jackScene3 from "@/assets/videos/jack-scene3.mp4";
import mermaidScene1 from "@/assets/videos/mermaid-scene1.mp4";
import mermaidScene2 from "@/assets/videos/mermaid-scene2.mp4";
import mermaidScene3 from "@/assets/videos/mermaid-scene3.mp4";

export const stories: Story[] = [
  {
    id: "alice-in-wonderland",
    title: "Alice in Wonderland",
    cover: "🐇",
    coverImage: "/images/alice-cover.jpg",
    author: "Lewis Carroll",
    progress: 0.4,
    lastScene: 1,
    scenes: [
      {
        id: 1, name: "The White Rabbit", emoji: "🐇",
        setting: "📍 A sunny riverbank, afternoon", mood: "Curious",
        moodColor: "bg-lavender text-lavender-deep", gradient: "from-lavender to-blush",
        videoUrl: aliceScene1,
        text: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do. Once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, and what is the use of a book thought Alice, without pictures or conversations? So she was considering in her own mind whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.",
      },
      {
        id: 2, name: "The Rabbit Hole", emoji: "🕳️",
        setting: "📍 Falling through a dark tunnel", mood: "Mysterious",
        moodColor: "bg-mint text-mint-deep", gradient: "from-mint to-lavender",
        videoUrl: aliceScene2,
        text: "In another moment, Alice had followed the White Rabbit down the large rabbit-hole under the hedge. The hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down what seemed to be a very deep well. Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next.",
      },
      {
        id: 3, name: "The Caterpillar", emoji: "🍄",
        setting: "📍 A magical mushroom garden", mood: "Whimsical",
        moodColor: "bg-peach text-peach-deep", gradient: "from-peach to-blush",
        videoUrl: aliceScene3,
        text: "The Caterpillar and Alice looked at each other for some time in silence. At last the Caterpillar took the hookah out of its mouth, and addressed her in a languid, sleepy voice. Who are you? said the Caterpillar. Alice replied, rather shyly, I hardly know, sir, just at present — at least I know who I was when I got up this morning, but I think I must have been changed several times since then.",
      },
      {
        id: 4, name: "The Mad Tea Party", emoji: "🎩",
        setting: "📍 A table under the trees", mood: "Joyful",
        moodColor: "bg-blush text-blush-deep", gradient: "from-blush to-peach",
        videoUrl: aliceScene4,
        text: "There was a table set out under a tree in front of the house, and the March Hare and the Hatter were having tea at it. A Dormouse was sitting between them, fast asleep, and the other two were using it as a cushion. The table was a large one, but the three were all crowded together at one corner of it. No room! No room! they cried out when they saw Alice coming.",
      },
    ],
  },
  {
    id: "humpty-dumpty",
    title: "Humpty Dumpty",
    cover: "🥚",
    coverImage: "/images/humpty-cover.jpg",
    author: "Traditional Nursery Rhyme",
    progress: 0,
    lastScene: 0,
    scenes: [
      {
        id: 1, name: "On the Wall", emoji: "🧱",
        setting: "📍 A tall stone wall, morning", mood: "Joyful",
        moodColor: "bg-peach text-peach-deep", gradient: "from-peach to-mint",
        videoUrl: humptyScene1,
        text: "Humpty Dumpty sat on a wall, looking out over the rolling green hills of the kingdom. He was quite proud of his perch — the highest point for miles around. From up here, he could see the castle towers, the winding river, and the tiny figures of the king's men on their morning patrol. He hummed a little tune to himself and swung his legs back and forth.",
      },
      {
        id: 2, name: "The Great Fall", emoji: "💥",
        setting: "📍 The base of the wall", mood: "Tense",
        moodColor: "bg-blush text-blush-deep", gradient: "from-blush to-lavender",
        videoUrl: humptyScene2,
        text: "A sudden gust of wind swept across the wall. Humpty Dumpty wobbled, his arms spinning wildly. He reached for something to hold onto, but the smooth stones offered no grip. With a great cry, he tumbled forward, falling through the air. The world spun around him — blue sky, green grass, grey stones — until he landed with a tremendous crash at the base of the wall.",
      },
      {
        id: 3, name: "The King's Men", emoji: "🐴",
        setting: "📍 The kingdom's courtyard", mood: "Dreamy",
        moodColor: "bg-lavender text-lavender-deep", gradient: "from-lavender to-mint",
        videoUrl: humptyScene3,
        text: "All the king's horses and all the king's men came galloping to the scene. They gathered around poor Humpty Dumpty, scratching their heads and consulting their maps and manuals. They tried glue. They tried tape. They tried the finest royal cement. But no matter what they did, they couldn't put Humpty Dumpty together again. Sometimes, things change forever — and that's okay too.",
      },
    ],
  },
  {
    id: "tangled",
    title: "Tangled",
    cover: "👸",
    coverImage: "/images/tangled-cover.jpg",
    author: "Brothers Grimm (Retold)",
    progress: 0,
    lastScene: 0,
    scenes: [
      {
        id: 1, name: "The Tower", emoji: "🏰",
        setting: "📍 A hidden tower in the forest", mood: "Dreamy",
        moodColor: "bg-lavender text-lavender-deep", gradient: "from-lavender to-blush",
        videoUrl: tangledScene1,
        text: "Deep in an enchanted forest, far from any road or path, stood a tall stone tower with no door and no stairs. At the very top, behind a single window draped in ivy, lived a girl named Rapunzel. She had never left the tower, not once in all her years. Her days were filled with painting, reading, and brushing her impossibly long golden hair that trailed across the floor like a river of sunlight.",
      },
      {
        id: 2, name: "The Stranger", emoji: "🤴",
        setting: "📍 The forest below the tower", mood: "Curious",
        moodColor: "bg-mint text-mint-deep", gradient: "from-mint to-peach",
        videoUrl: tangledScene2,
        text: "One afternoon, a young adventurer named Flynn stumbled upon the tower while running from the royal guard. He stared up at the impossible structure — no door, no ladder, just smooth stone rising into the sky. Then he heard singing, a voice so lovely it made the birds stop to listen. He called up, and a cascade of golden hair tumbled down from the window above. He blinked twice, shrugged, and began to climb.",
      },
      {
        id: 3, name: "The Lanterns", emoji: "🏮",
        setting: "📍 The kingdom at night", mood: "Magical",
        moodColor: "bg-peach text-peach-deep", gradient: "from-peach to-lavender",
        videoUrl: tangledScene3,
        text: "That night, the kingdom released thousands of floating lanterns into the sky — a tradition to honour their lost princess. Rapunzel and Flynn watched from a small boat on the lake. The lanterns drifted upward like golden stars, reflecting in the dark water all around them. Rapunzel's eyes filled with tears of joy. This was the moment she had dreamed of her entire life, and it was more beautiful than she had ever imagined.",
      },
    ],
  },
  {
    id: "three-little-pigs",
    title: "The Three Little Pigs",
    cover: "🐷",
    coverImage: "/images/pigs-cover.jpg",
    author: "Traditional Fairy Tale",
    progress: 0,
    lastScene: 0,
    scenes: [
      {
        id: 1, name: "Three Brothers", emoji: "🐷",
        setting: "📍 A green countryside, spring morning", mood: "Joyful",
        moodColor: "bg-mint text-mint-deep", gradient: "from-mint to-peach",
        videoUrl: pigsScene1,
        text: "Once upon a time, three little pigs set off from their mother's house to seek their fortunes in the wide world. The first pig was carefree and loved to dance and sing. The second pig was a bit more sensible, but still enjoyed a good nap. The third pig was the wisest of all — she always planned ahead and never rushed. Their mother kissed them goodbye and said, Whatever you do, build your houses strong!",
      },
      {
        id: 2, name: "The Straw House", emoji: "🌾",
        setting: "📍 A meadow by the woods", mood: "Whimsical",
        moodColor: "bg-peach text-peach-deep", gradient: "from-peach to-blush",
        videoUrl: pigsScene2,
        text: "The first pig built his house out of straw because it was the easiest thing to do. He finished by lunchtime and spent the rest of the day playing his flute. But when the big bad wolf came knocking, he huffed and he puffed, and he blew the house right down! The little pig squealed and ran as fast as his trotters could carry him to his brother's house.",
      },
      {
        id: 3, name: "The Brick House", emoji: "🧱",
        setting: "📍 A sturdy hill, sunset", mood: "Tense",
        moodColor: "bg-blush text-blush-deep", gradient: "from-blush to-lavender",
        videoUrl: pigsScene3,
        text: "The third pig had built her house from bricks. It took her many days of hard work, but every brick was placed with care. When the wolf arrived, he huffed and he puffed, but the house stood firm. He tried again and again, but the brick house would not budge. Finally, he tried to sneak down the chimney — but the clever pig had a pot of hot soup waiting! The wolf yelped, leaped out, and was never seen again.",
      },
    ],
  },
  {
    id: "goldilocks",
    title: "Goldilocks & The Bears",
    cover: "🐻",
    coverImage: "/images/goldilocks-cover.jpg",
    author: "Robert Southey (Retold)",
    progress: 0,
    lastScene: 0,
    scenes: [
      {
        id: 1, name: "The Cottage", emoji: "🏡",
        setting: "📍 A cozy cottage in the woods", mood: "Curious",
        moodColor: "bg-lavender text-lavender-deep", gradient: "from-lavender to-mint",
        videoUrl: goldilocksScene1,
        text: "Deep in the forest, there was a charming little cottage where three bears lived — Papa Bear, Mama Bear, and Baby Bear. One morning, they made porridge for breakfast. But it was far too hot to eat! So they decided to take a walk while it cooled. While they were away, a curious girl named Goldilocks wandered through the woods and found their door wide open.",
      },
      {
        id: 2, name: "Just Right", emoji: "🥣",
        setting: "📍 Inside the bears' kitchen", mood: "Whimsical",
        moodColor: "bg-peach text-peach-deep", gradient: "from-peach to-mint",
        videoUrl: goldilocksScene2,
        text: "Goldilocks tried Papa Bear's porridge — too hot! She tried Mama Bear's porridge — too cold! Then she tried Baby Bear's porridge, and it was just right, so she ate it all up. She sat in three chairs — Papa's was too hard, Mama's was too soft, and Baby's was just right... until it broke! Oops! Upstairs, she tried three beds and fell fast asleep in Baby Bear's, which was — you guessed it — just right.",
      },
      {
        id: 3, name: "The Bears Return", emoji: "🐻",
        setting: "📍 The bears' bedroom", mood: "Tense",
        moodColor: "bg-blush text-blush-deep", gradient: "from-blush to-peach",
        videoUrl: goldilocksScene3,
        text: "When the three bears came home, they knew something was wrong. Someone's been eating my porridge! growled Papa Bear. Someone's been sitting in my chair! said Mama Bear. And someone's been sleeping in my bed — and she's STILL HERE! cried Baby Bear. Goldilocks woke up, saw the three bears staring at her, and jumped right out the window! She ran all the way home and never wandered into strange houses again.",
      },
    ],
  },
  {
    id: "jack-and-beanstalk",
    title: "Jack & The Beanstalk",
    cover: "🌱",
    coverImage: "/images/jack-cover.jpg",
    author: "Traditional English Tale",
    progress: 0,
    lastScene: 0,
    scenes: [
      {
        id: 1, name: "Magic Beans", emoji: "🫘",
        setting: "📍 A poor farmhouse, early morning", mood: "Curious",
        moodColor: "bg-mint text-mint-deep", gradient: "from-mint to-lavender",
        videoUrl: jackScene1,
        text: "Jack and his mother were very poor. All they had was one old cow. One day, his mother sent him to sell the cow at market. On the way, Jack met a strange old man who offered him five magic beans for the cow. Jack's eyes grew wide — magic beans! He traded the cow right away. When he got home, his mother was furious. She threw the beans out the window and sent Jack to bed without supper.",
      },
      {
        id: 2, name: "The Giant's Castle", emoji: "🏰",
        setting: "📍 Above the clouds, a golden castle", mood: "Magical",
        moodColor: "bg-lavender text-lavender-deep", gradient: "from-lavender to-peach",
        videoUrl: jackScene2,
        text: "By morning, a massive beanstalk had grown all the way up into the clouds! Jack climbed and climbed until he reached a magnificent castle floating in the sky. Inside, everything was enormous — the tables, the chairs, the golden plates. Then he heard thundering footsteps. FEE-FI-FO-FUM! boomed a giant voice. Jack hid inside a teacup just in time, his heart pounding like a drum.",
      },
      {
        id: 3, name: "The Golden Harp", emoji: "🎵",
        setting: "📍 The beanstalk, racing down", mood: "Tense",
        moodColor: "bg-blush text-blush-deep", gradient: "from-blush to-mint",
        videoUrl: jackScene3,
        text: "Jack grabbed the golden harp and ran! But the harp cried out, Master! Master! The giant woke with a roar and chased Jack through the castle, down the beanstalk. Jack climbed down faster than he ever had before. When he reached the bottom, he grabbed an axe and chopped the beanstalk down. TIMBER! The giant tumbled back into the clouds, never to be seen again. Jack and his mother lived happily with their golden treasures.",
      },
    ],
  },
  {
    id: "little-mermaid",
    title: "The Little Mermaid",
    cover: "🧜‍♀️",
    coverImage: "/images/mermaid-cover.jpg",
    author: "Hans Christian Andersen",
    progress: 0,
    lastScene: 0,
    scenes: [
      {
        id: 1, name: "Under the Sea", emoji: "🌊",
        setting: "📍 A glittering coral palace", mood: "Dreamy",
        moodColor: "bg-lavender text-lavender-deep", gradient: "from-lavender to-mint",
        videoUrl: mermaidScene1,
        text: "Far beneath the waves, in a palace made of coral and pearls, lived a young mermaid named Marina. She had the most beautiful voice in all the ocean — when she sang, even the fish would stop swimming to listen. Marina loved her underwater world, but she always gazed upward, dreaming of the land above, where the sun shone warm and people walked on two legs.",
      },
      {
        id: 2, name: "The Storm", emoji: "⛈️",
        setting: "📍 The stormy surface of the sea", mood: "Tense",
        moodColor: "bg-blush text-blush-deep", gradient: "from-blush to-lavender",
        videoUrl: mermaidScene2,
        text: "One night, a terrible storm raged across the ocean. Marina swam to the surface and saw a ship being tossed by the waves. A young prince fell overboard! Without thinking, Marina dove through the crashing waves and pulled him to shore. She stayed by his side until dawn, singing softly. When he finally opened his eyes, she slipped back into the sea, her heart full of a feeling she had never known before.",
      },
      {
        id: 3, name: "The Choice", emoji: "✨",
        setting: "📍 A moonlit beach", mood: "Magical",
        moodColor: "bg-mint text-mint-deep", gradient: "from-mint to-peach",
        videoUrl: mermaidScene3,
        text: "The sea witch offered Marina a deal — she could have legs and walk on land, but she would have to give up her beautiful voice. Marina thought long and hard. Her voice was her most precious gift, but her heart longed for the world above. In the end, Marina chose to keep her voice and her tail. She realized that being true to yourself is the most magical thing of all. She returned to the sea, singing louder and more beautifully than ever.",
      },
    ],
  },
];
