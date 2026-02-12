# Multi-AI Chat 🤖

Chat with multiple AI models simultaneously and compare their responses in real-time!

![Multi-AI Chat](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## ✨ Features

- 🚀 **Chat with 5+ AI models at once** - Compare responses side-by-side
- 🏠 **Local AI Support** - Run models on your computer (Ollama)
- ☁️ **Remote API Support** - Connect to GPT, Claude, Gemini via OpenRouter
- 💾 **Chat History** - Automatically saves all conversations
- 🎨 **Clean Dark UI** - Minimal ChatGPT-like interface
- ⚡ **Fast & Responsive** - Built with React + Vite

## 🚀 Quick Start

### 1. Install Node.js
Download from: https://nodejs.org/ (v18 or later)

### 2. Clone & Install
```bash
git clone https://github.com/Codesofsahil/Multi-AI.git
cd Multi-AI
npm install
```

### 3. Run the App
```bash
npm run dev
```
Open: `http://localhost:5173`

## 🤖 Setup AI Models

### Local Models (Free)

1. **Install Ollama**: https://ollama.ai/
2. **Download models**:
```bash
ollama run llama3.2:latest
ollama run mistral:latest
ollama run phi3:latest
ollama run deepseek-coder:1.3b
ollama run qwen2.5:1.5b
```
3. **Start chatting!**

### Remote APIs (Paid)

1. Get API key from: https://openrouter.ai/keys
2. Open app → Settings → API Keys
3. Paste key and click Save

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Sidebar.tsx      # Chat history sidebar
│   ├── ModelBar.tsx     # Model selection bar
│   ├── MultiColumnChat.tsx  # Chat display
│   ├── BottomInput.tsx  # Message input
│   └── SettingsPage.tsx # Settings modal
├── config/
│   └── models.ts        # Model configurations
├── hooks/
│   └── useChat.ts       # Chat logic
├── services/
│   ├── api.ts           # API service
│   ├── settings.ts      # Settings storage
│   └── chatHistory.ts   # Chat history
└── types/
    └── index.ts         # TypeScript types
```

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- Ollama (Local AI)
- OpenRouter (Remote APIs)

## 📝 License

MIT License

## 👨💻 Author

**Sahil Sharma**
- GitHub: [@Codesofsahil](https://github.com/Codesofsahil)
- Email: sahilsharma.works@gmail.com

---

**⚠️ Note:** This is a personal college project. Not accepting contributions at this time.

Made with ❤️ by Sahil Sharma
