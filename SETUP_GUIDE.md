# Anton LaVey Chatbot - Setup and Installation Guide

## Quick Start

### Prerequisites
- Node.js 22.13.0 or higher
- pnpm package manager
- Valid OpenAI API key
- Valid ElevenLabs API key

### Installation (5 minutes)

1. **Navigate to the project directory**:
   ```bash
   cd /home/ubuntu/lavey_chatbot
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure environment variables**:
   Edit the `.env` file with your API keys:
   ```
   VITE_API_URL=http://localhost:5174
   OPENAI_API_KEY=your_openai_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   ```

4. **Start the backend server** (Terminal 1):
   ```bash
   pnpm server
   ```
   You should see: `🔥 Anton LaVey Chatbot Server running on http://localhost:5174`

5. **Start the frontend** (Terminal 2):
   ```bash
   pnpm dev
   ```
   You should see: `Local: http://localhost:5173/`

6. **Open your browser** and navigate to `http://localhost:5173`

## Obtaining API Keys

### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and paste it into `.env`

### ElevenLabs API Key
1. Go to https://elevenlabs.io
2. Sign up for a free account
3. Navigate to your account settings
4. Find the API key section
5. Copy your API key and paste it into `.env`

## Project Files Overview

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main React component with chat interface |
| `src/App.css` | Application styling |
| `server.mjs` | Express backend server |
| `package.json` | Project dependencies |
| `.env` | Environment variables (API keys) |
| `README.md` | User documentation |
| `PROJECT_SUMMARY.md` | Detailed project overview |

## Running Commands

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start frontend dev server (port 5173) |
| `pnpm server` | Start backend server (port 5174) |
| `pnpm dev:full` | Start both frontend and backend |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |

## Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" error:
```bash
# Find and kill the process using the port
lsof -i :5174  # For backend
lsof -i :5173  # For frontend
kill -9 <PID>
```

### API Key Issues
- Ensure keys are correctly copied (no extra spaces)
- Check that `.env` file exists in project root
- Restart the server after changing `.env`

### No Audio Response
- Verify ElevenLabs API key is valid
- Check browser console for errors (F12)
- Ensure `includeAudio: true` is being sent

### Frontend Not Connecting
- Verify backend is running on port 5174
- Check browser console for CORS errors
- Ensure `VITE_API_URL` matches backend URL

## Architecture

```
Frontend (React + Vite)
    ↓ (HTTP Requests)
Backend (Express)
    ↓ (API Calls)
OpenAI GPT-4.1-mini
ElevenLabs TTS
```

## Features

✅ Chat with Anton LaVey's persona
✅ Text-to-speech voice synthesis
✅ Conversation history
✅ Gothic-themed interface
✅ Responsive design
✅ Real-time responses

## Next Steps

1. Start the application following the Quick Start guide
2. Ask the chatbot about Satanism, The Satanic Bible, or Anton LaVey
3. Click "Listen" to hear responses in Anton's voice
4. Explore the knowledge base through conversation

## Support

For issues:
1. Check the troubleshooting section above
2. Review the README.md for detailed documentation
3. Check server logs for error messages
4. Verify API keys are valid and active

---

**Happy chatting with Anton LaVey! 🔥**
