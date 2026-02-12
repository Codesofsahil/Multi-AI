# Multi-Model Chat 🤖

Chat with multiple AI models simultaneously and compare their responses in real-time!

![Multi-Model Chat](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## ✨ Features

- 🚀 **Chat with 5+ AI models at once** - Compare responses side-by-side
- 🏠 **Local AI Support** - Run models on your computer (no API keys needed!)
- ☁️ **Remote API Support** - Connect to GPT, Claude, Gemini via OpenRouter
- 💾 **Chat History** - Automatically saves all your conversations
- 🎨 **Clean Dark UI** - Minimal ChatGPT-like interface
- ⚡ **Fast & Responsive** - Built with React + Vite

## 📸 Screenshot

![App Screenshot](multi-model-chat-compare.png)

---

## 🚀 Quick Start (Copy & Paste!)

### Step 1: Install Node.js

**Download and install Node.js v18 or later:**
- Windows/Mac: https://nodejs.org/
- Click "Download" → Run installer → Click "Next" until done

**Verify installation** (open Command Prompt/Terminal):
```bash
node --version
npm --version
```

### Step 2: Clone This Project

```bash
git clone https://github.com/YOUR-USERNAME/multi-model-chat.git
cd multi-model-chat
```

### Step 3: Install Dependencies

**Copy and paste this command:**
```bash
npm install
```

Wait 1-2 minutes for installation to complete.

### Step 4: Run the App

```bash
npm run dev
```

**Open your browser and go to:** `http://localhost:5173`

🎉 **Done! The app is now running!**

---

## 🤖 Setting Up AI Models

You have 2 options: **Local Models (Free)** or **Remote APIs (Paid)**

### Option 1: Local Models (Recommended for Beginners)

**Step 1: Install Ollama**
- Download from: https://ollama.ai/
- Run installer → Click "Next" until done

**Step 2: Download AI Models**

Open Command Prompt and run these commands **one by one**:

```bash
ollama run llama3.2:latest
```
Wait for download to finish, then press `Ctrl+C` to exit.

```bash
ollama run mistral:latest
```
Wait for download, then press `Ctrl+C`.

```bash
ollama run phi3:latest
```
Wait for download, then press `Ctrl+C`.

```bash
ollama run deepseek-coder:1.3b
```
Wait for download, then press `Ctrl+C`.

```bash
ollama run qwen2.5:1.5b
```
Wait for download, then press `Ctrl+C`.

**Step 3: Start Ollama Server**

Ollama runs automatically in the background. If not, run:
```bash
ollama serve
```

**Step 4: Use the App**
- Open the app in your browser
- Toggle ON the models you want to use
- Start chatting!

---

### Option 2: Remote API Models (GPT, Claude, Gemini)

**Step 1: Get API Key**
- Go to: https://openrouter.ai/keys
- Sign up (free)
- Create a new API key
- Copy the key (starts with `sk-or-v1-...`)

**Step 2: Add API Key to App**
- Open the app
- Click **Settings** (bottom left)
- Go to **API Keys** tab
- Paste your API key
- Click **Save API Key**

**Step 3: Use Remote Models**
- Remote models (GPT-4o Mini, Claude, Gemini) will now appear
- Toggle them ON and start chatting!

---

## 📁 Project Structure

```
multi-model-chat/
├── src/
│   ├── components/          # React components
│   │   ├── Sidebar.tsx      # Left sidebar with chat history
│   │   ├── ModelBar.tsx     # Top bar with model toggles
│   │   ├── MultiColumnChat.tsx  # Chat display area
│   │   ├── BottomInput.tsx  # Message input box
│   │   ├── SettingsPage.tsx # Settings modal
│   │   └── AddModelModal.tsx # Add new model modal
│   ├── config/
│   │   └── models.ts        # Model configurations
│   ├── hooks/
│   │   └── useChat.ts       # Chat logic hook
│   ├── services/
│   │   ├── api.ts           # API service for models
│   │   ├── settings.ts      # Settings management
│   │   └── chatHistory.ts   # Chat history storage
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Static files
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

---

## 🛠️ Available Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎯 How to Use

### 1. Select Models
- Toggle ON the models you want to chat with (max 5)
- Green dot = model is active

### 2. Send Messages
- Type your message in the bottom input box
- Press Enter or click Send
- All selected models will respond simultaneously

### 3. View Responses
- Each model's response appears in its own column
- Responses appear as they're generated

### 4. Manage Chats
- **New Chat** - Start a fresh conversation
- **Chat History** - Click any previous chat to load it
- **Delete Chat** - Hover over chat → Click trash icon
- **Clear All** - Delete all chat history

### 5. Add Custom Models
- Click **Add model** button
- Choose **Local (Ollama)** or **API (Remote)**
- Follow the instructions in the modal
- Enter model details and click Add

---

## 🔧 Troubleshooting

### Models not showing up?
```bash
# Clear browser cache
# Press F12 → Console → Run:
localStorage.clear()
location.reload()
```

### Ollama models not working?
```bash
# Check if Ollama is running:
ollama list

# Restart Ollama:
ollama serve
```

### Slow responses?
- Local models are slower on CPU (10-30 seconds per response)
- Use only 1-2 models at a time
- Use smaller models (Qwen 2.5, DeepSeek Coder)
- Or use remote APIs (GPT, Claude) for instant responses

### Port already in use?
```bash
# Kill process on port 5173 (Windows):
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Then run again:
npm run dev
```

---

## 🌟 Features Explained

### Local Models (Ollama)
- ✅ **Free** - No API costs
- ✅ **Private** - Data stays on your computer
- ✅ **Offline** - Works without internet
- ❌ **Slower** - 10-30 seconds per response on CPU
- ❌ **Requires** - 4-8GB RAM per model

### Remote API Models
- ✅ **Fast** - 1-2 seconds per response
- ✅ **Powerful** - Latest GPT, Claude, Gemini models
- ❌ **Costs money** - Pay per API call
- ❌ **Requires internet** - Must be online
- ❌ **Less private** - Data sent to API providers

---

## 📦 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **State**: React Hooks
- **Storage**: localStorage
- **Markdown**: react-markdown + rehype-highlight
- **Icons**: Lucide React

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Open a Pull Request

---

## 📝 License

MIT License - feel free to use this project for anything!

---

## 🆘 Need Help?

- **Issues**: Open an issue on GitHub
- **Questions**: Check existing issues or create a new one
- **Ollama Docs**: https://ollama.ai/
- **OpenRouter Docs**: https://openrouter.ai/docs

---

## 🎓 Perfect for Students!

This project is beginner-friendly:
- ✅ Clear step-by-step instructions
- ✅ No complex setup required
- ✅ Works on Windows/Mac/Linux
- ✅ Free to use with local models
- ✅ Great for learning React + TypeScript

**Just copy, paste, and run!** 🚀

---

Made with ❤️ by [Your Name]
