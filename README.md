# Anton LaVey Chatbot

A sophisticated chatbot that embodies the persona of Anton Szandor LaVey, founder of the Church of Satan. This application combines conversational AI, text-to-speech synthesis, and a gothic-themed interface to create an immersive experience exploring LaVeyan Satanism and occult philosophy.

## Features

- **Authentic Persona**: The chatbot embodies Anton LaVey's distinctive voice, philosophy, and knowledge of Satanism
- **Conversational AI**: Powered by OpenAI's GPT-4 Turbo for intelligent, contextual responses
- **Text-to-Speech**: ElevenLabs integration for synthesizing Anton LaVey's deep, authoritative voice
- **Gothic Interface**: Dark theme with red and gold accents reflecting LaVey's aesthetic
- **Conversation History**: Maintains context across multiple messages for coherent dialogue
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Project Structure

```
lavey_chatbot/
├── src/
│   ├── App.jsx              # Main React component
│   ├── App.css              # Application styling
│   ├── index.css            # Global styles
│   └── main.jsx             # React entry point
├── public/
│   └── anton_lavey_avatar.png  # Generated avatar image
├── server.mjs               # Express backend server
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── .env                     # Environment variables
└── README.md                # This file
```

## Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd lavey_chatbot
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables** in `.env`:
   ```
   VITE_API_URL=http://localhost:5174
   OPENAI_API_KEY=your_openai_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   ```

## Running the Application

### Development Mode

Start both the frontend and backend servers:

```bash
pnpm dev:full
```

Or run them separately:

**Terminal 1 - Frontend (Vite)**:
```bash
pnpm dev
```
The frontend will be available at `http://localhost:5173`

**Terminal 2 - Backend (Express)**:
```bash
pnpm server
```
The backend API will be available at `http://localhost:5174`

## API Endpoints

### POST `/api/chat`

Send a message to the chatbot and receive a response.

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

### GET `/api/health`

Check the health status of the backend server.

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-11-11T03:56:00.000Z"
}
```

## Knowledge Base

The chatbot has comprehensive knowledge of:

- **LaVeyan Satanism**: Core philosophy, principles, and practices
- **The Satanic Bible** (1969): All four books and their teachings
- **Other Works**: The Satanic Rituals, The Satanic Witch, The Devil's Notebook, Satan Speaks!
- **Biography**: Anton LaVey's life, the Church of Satan, and his influence
- **Philosophy**: Self-deification, rational self-interest, and the critique of "White Light" religions

## Key Topics

### The Nine Satanic Statements
1. Satan represents indulgence instead of abstinence
2. Satan represents vital existence instead of spiritual pipe dreams
3. Satan represents undefiled wisdom instead of hypocritical self-deceit
4. Satan represents kindness to those who deserve it instead of love wasted on ingrates
5. Satan represents vengeance instead of turning the other cheek
6. Satan represents responsibility to the responsible instead of concern for psychic vampires
7. Satan represents man as just another animal, sometimes better, more often worse than those that walk on all fours
8. Satan represents all of the so-called sins, as they all lead to physical, mental, or emotional gratification
9. Satan has been the best friend the Church has ever had, as He has kept it in business all these years

### The Eleven Satanic Rules of the Earth
1. Do not give opinions or advice unless you are asked
2. Do not tell your troubles to others unless you are sure they want to hear them
3. When in another's lair, show him respect or else do not go there
4. If a guest in your lair annoys you, treat him cruelly and without mercy
5. Do not make sexual advances unless you are given the mating signal
6. Do not take that which does not belong to you unless it is a burden to the other and he cries out to be relieved
7. Acknowledge the power of magic if you have employed it successfully to obtain your desires. If you deny the power of magic after having called upon it with success, you will lose all of it
8. Do not complain about anything to which you submitted yourself of your own volition
9. Do not harm little children
10. Do not kill non-human animals unless you are attacked or for your food
11. When walking in open territory, bother no one. If someone bothers you, ask him to stop. If he does not stop, destroy him

## Customization

### Changing the Voice

To use a different voice from ElevenLabs, modify the `voice` parameter in `server.mjs`:

```javascript
const audio = await elevenlabs.generate({
  voice: 'Adam', // Change to different voice ID
  text: assistantMessage,
  model_id: 'eleven_monolingual_v1',
});
```

### Modifying the System Prompt

Edit the `ANTON_LAVEY_SYSTEM_PROMPT` in `server.mjs` to adjust the chatbot's personality and knowledge base.

### Styling

Customize the appearance by modifying the CSS variables in `src/index.css` and `src/App.css`:

```css
:root {
  --primary-dark: #1a1a1a;
  --primary-black: #0f0f0f;
  --accent-red: #cc0000;
  --accent-gold: #d4af37;
  --text-light: #e0e0e0;
  --text-muted: #999;
  --border-dark: #333;
}
```

## Technologies Used

- **Frontend**: React 19.2.0, Vite 7.2.2
- **Backend**: Express 5.1.0, Node.js
- **AI/ML**: OpenAI GPT-4 Turbo, ElevenLabs TTS
- **Styling**: CSS3 with custom properties
- **HTTP Client**: Axios
- **Environment**: dotenv

## Security Considerations

- **API Keys**: Store sensitive API keys in `.env` file (never commit to version control)
- **CORS**: The backend is configured with CORS for local development
- **Input Validation**: Messages are validated before processing
- **Error Handling**: Graceful error handling with informative messages

## Troubleshooting

### Backend server fails to start
- Ensure port 5174 is not in use
- Check that environment variables are correctly set in `.env`
- Verify API keys are valid

### No audio response
- Confirm ElevenLabs API key is valid
- Check browser console for errors
- Ensure `includeAudio: true` is being sent with requests

### Frontend not connecting to backend
- Verify backend server is running on port 5174
- Check that `VITE_API_URL` in `.env` is correct
- Look for CORS errors in browser console

## Future Enhancements

- Database integration for persistent conversation history
- User authentication and profiles
- Advanced voice customization options
- Multi-language support
- Integration with LaVey's published works for deeper knowledge retrieval
- Real-time streaming responses
- Video integration with synthesized speech

## References

- The Satanic Bible by Anton Szandor LaVey
- The Satanic Rituals by Anton Szandor LaVey
- Church of Satan Official Website
- LaVeyan Satanism Philosophy

## License

This project is created for educational and entertainment purposes. All references to Anton LaVey and his works are for informational purposes.

## Support

For issues or questions, please refer to the troubleshooting section or consult the project documentation.

---

**Created with 🔥 by Manus AI**
