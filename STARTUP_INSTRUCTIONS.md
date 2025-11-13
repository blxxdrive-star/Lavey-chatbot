# Anton LaVey Chatbot - Startup Instructions

## ✅ Installation Complete

Your Anton LaVey Chatbot is now fully installed and running!

## 🚀 Running Services

### Backend Server
- **Status**: ✅ Running
- **Port**: 5174
- **URL**: http://localhost:5174
- **Health Check**: http://localhost:5174/api/health
- **Chat API**: http://localhost:5174/api/chat

### Frontend Server
- **Status**: ✅ Running
- **Port**: 5175
- **Local URL**: http://localhost:5175
- **Public URL**: https://5175-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer

## 🎯 How to Use

### 1. Access the Chatbot
Open your browser and navigate to:
- **Local**: http://localhost:5175
- **Public**: https://5175-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer

### 2. Chat with Anton LaVey
Type your questions in the message input field. You can ask about:
- Satanism and LaVeyan philosophy
- The Satanic Bible and its teachings
- The Nine Satanic Statements
- The Eleven Satanic Rules of the Earth
- Anton LaVey's life and influence
- His other published works
- Occult philosophy and practices

### 3. Listen to Responses
Click the "🔊 Listen" button below any response to hear Anton's voice synthesized by ElevenLabs.

### 4. Explore the Knowledge Base
Engage in natural conversation to explore the comprehensive knowledge base about:
- LaVeyan Satanism
- The Satanic Bible (all four books)
- The Satanic Rituals
- The Satanic Witch
- The Devil's Notebook
- Satan Speaks!
- Anton LaVey's biography

## 📋 Project Structure

```
/home/ubuntu/lavey_chatbot/
├── src/                    # React frontend source code
│   ├── App.jsx            # Main chat component
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles
│   └── main.jsx           # React entry point
├── public/                # Static assets
│   └── anton_lavey_avatar.png  # Chatbot avatar
├── server.mjs             # Express backend server
├── package.json           # Project dependencies
├── .env                   # Environment configuration
├── vite.config.js         # Vite build config
├── README.md              # Full documentation
├── PROJECT_SUMMARY.md     # Technical overview
├── SETUP_GUIDE.md         # Installation guide
└── todo.md                # Feature tracking
```

## 🔧 Command Reference

### Start Services
```bash
# Start backend server (Terminal 1)
cd /home/ubuntu/lavey_chatbot
pnpm server

# Start frontend server (Terminal 2)
cd /home/ubuntu/lavey_chatbot
pnpm dev
```

### Build for Production
```bash
cd /home/ubuntu/lavey_chatbot
pnpm build
```

### View Production Build
```bash
cd /home/ubuntu/lavey_chatbot
pnpm preview
```

## 🔌 API Endpoints

### POST /api/chat
Send a message and receive a response with optional audio.

**Request**:
```json
{
  "message": "Tell me about The Satanic Bible",
  "userId": "default",
  "includeAudio": true
}
```

**Response**:
```json
{
  "message": "Ah, the cornerstone of my philosophy...",
  "audioUrl": "data:audio/mpeg;base64,...",
  "conversationId": "default"
}
```

### GET /api/health
Check server status.

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-11-11T10:03:19.598Z"
}
```

## 🔐 Configuration

### Environment Variables (.env)
```
VITE_API_URL=http://localhost:5174
OPENAI_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here
```

## 🛠️ Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" error:
```bash
# Find process using the port
lsof -i :5174  # Backend
lsof -i :5175  # Frontend

# Kill the process
kill -9 <PID>
```

### No Audio Response
- Verify ElevenLabs API key is valid
- Check browser console for errors (F12)
- Ensure audio is not muted in browser

### Frontend Not Connecting
- Verify backend is running on port 5174
- Check browser console for CORS errors
- Ensure VITE_API_URL matches backend URL

### API Errors
- Check that OpenAI API key is valid
- Verify internet connection
- Review server logs for detailed error messages

## 📚 Documentation

- **README.md** - Complete user guide
- **PROJECT_SUMMARY.md** - Technical architecture
- **SETUP_GUIDE.md** - Installation instructions
- **persona_profile.md** - Detailed persona documentation

## 🎨 Features

✅ Real-time chat with Anton LaVey's persona
✅ Text-to-speech voice synthesis
✅ Conversation history and context
✅ Gothic-themed interface
✅ Responsive design (mobile & desktop)
✅ AI-generated avatar
✅ Comprehensive knowledge base
✅ Production-ready architecture

## 💡 Tips

1. **Ask follow-up questions** - The chatbot maintains conversation context
2. **Be specific** - More detailed questions yield better responses
3. **Listen to responses** - Anton's voice adds authenticity
4. **Explore topics** - Use natural conversation to explore the knowledge base
5. **Reference works** - Ask about specific books or concepts

## 🌐 Accessing Remotely

The chatbot is accessible via the public URL:
**https://5175-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer**

This URL can be shared with others to access the chatbot remotely.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the documentation files
3. Check server logs for error messages
4. Verify API keys are valid and active

## 🔥 Enjoy!

You now have a fully functional Anton LaVey chatbot. Start exploring the world of LaVeyan Satanism and engage with Anton's philosophy through intelligent conversation!

---

**Installation Date**: November 11, 2025
**Status**: ✅ Ready for Use
**Version**: 1.0.0
