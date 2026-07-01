## What we've done / anchored summary

### 2026-07-01
- Started with original multi-page school website (React + TypeScript + Vite)
- **Removed dark theme** — light theme only
- **Removed Fee Management** admin panel
- **Removed old AI Tutor** (Gemini API direct key exposure); replaced with **Gemini AI ChatBot** using `api/chat` as backend
- **Created `/api/chat`** — Vercel serverless function for Gemini AI (uses `GEMINI_API_KEY` env var)
- **Created `ChatBotContext`** — global React context to control chatbot open/close state
- **Added "Ask AI" button** to `Navbar` — toggles chatbot via context
- **Replaced AI system prompt** with comprehensive tutor persona covering identity, teaching methodology, step-by-step math/science/english/computer formats, image analysis, language support, and school info
- **Updated welcome message** in `ChatBot.tsx` to match new tutor intro
- **Tutor prompt now includes**: math step-by-step format (Given → Formula → Calculation → Explanation → Final Answer), impossible question handling, word problem breakdown, science (Definition → Explanation → Example → Summary), English grammar rule-first, computer with code blocks + line-by-line explanation, image/homework analysis, quiz generation, Hindi language support, Markdown + LaTeX + emoji formatting
- **Tutor persona**: Never says "I'm just an AI", assumes student is a beginner, always positive and encouraging, teaches concepts rather than giving answers

## Lessons Learned
- When removing large sections, check all related imports and router entries to avoid orphan references
- For chatbot backend, `api/chat.js` works for **Vercel**; `server/index.js` for **local dev** — keep both in sync
- Updating Navbar + Layout + Context simultaneously ensures no stale references
- System prompt changes go in `api/chat.js` AND `server/index.js` — both files must stay in sync
- Vercel function doesn't support CommonJS `require` for local Express; use ESM `import` in `api/` directory
- `CHAT_LABEL` constant centrally controls the "Ask AI" button text in Navbar
