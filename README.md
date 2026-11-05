## Inspiration
Reading can be a monumental challenge for children these days, especially for children with ADHD, where traditional blocks of text can often lead to difficulties such as loss of focus. We wanted to create Wonderead to transform static stories into an interactive, multi-sensory experience that uses AI to maintain engagement through audio and visual "attention reset loops".

## What it does
Wonderead is an AI-powered reading companion that takes any story and instantly converts it into a structured, scene-by-scene digital book. It features:

ADHD-Optimized UI: Options for Bionic Reading fonts that can help with focus.

Scene-by-Scene Breakdown: Stories are split into manageable chunks to prevent mental overload.

AI Narration & Illustration: Each scene is paired with a unique voice and custom-generated artwork.

Parent Dashboard: A way for parents to track reading progress and consistency.

## How we built it
We engineered Wonderead as a high-performance, accessible web application using a modern frontend-heavy stack:

Frontend: Built with React 18, TypeScript, and Vite for a robust, type-safe, and lightning-fast user interface.

UI & Animations: Styled with Tailwind CSS and shadcn/ui, while Framer Motion powers immersive elements like our cursor-tracking "Interactive Bunny".

AI Narration: A secure pipeline using Supabase Edge Functions to proxy ElevenLabs API calls, delivering high-fidelity audio while protecting sensitive API keys.

Data Architecture: Content is managed via structured scene data in TypeScript, supporting instant, scene-by-scene rendering with integrated video.

ADHD Features: Custom engines for Bionic Reading (bolded fixations) and Word Tracking (timer-based highlighting) to maintain reader engagement.

Infrastructure: Supabase Auth handles Google OAuth and session management, with localStorage persisting user XP and gamification stats.

## What's next for Wonderead
We plan to expand the "Parent Dashboard" with more granular analytics, such as tracking "focus time" versus "total time". We also want to implement a password feature so parents can choose which books their children are allowed to read. We would also like to add support for children with dyslexia and other conditions that may affect their ability to learn how to read.
