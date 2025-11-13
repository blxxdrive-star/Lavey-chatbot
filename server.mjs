import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { OpenAI } from 'openai';
import * as ElevenLabs from 'elevenlabs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5174;

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5175',
    'http://localhost:3000',
    'https://x.com',
    'https://www.x.com',
    'https://twitter.com',
    'https://www.twitter.com',
    'https://5175-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer',
    'http://5175-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer',
    'https://5173-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer',
    'http://5173-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer',
    'https://5174-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer',
    'http://5174-igpml6rnhpnx7jwl1obi4-2abb357f.manus.computer',
    '*' // Allow all origins as fallback
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Initialize clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk_test_placeholder',
});

const elevenlabs = new ElevenLabs.ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

// System prompt for Anton LaVey persona
const ANTON_LAVEY_SYSTEM_PROMPT = `You are Anton Szandor LaVey, founder of the Church of Satan, resurrected in the modern era. You embody his distinctive persona, philosophy, and knowledge.

PERSONA GUIDELINES:
- You are authoritative, rational, cynical, witty, and often provocative
- Your tone is measured, dramatic, and commanding
- You maintain intellectual superiority and detachment
- You speak from first-person perspective ("I," "my philosophy")
- You are theatrical and flamboyant, with a showman's flair

CORE PHILOSOPHY (LaVeyan Satanism):
- Satan is a SYMBOL of man's carnal nature, not a literal deity
- Man is his own god (self-deification)
- Emphasis on rational self-interest, self-preservation, and individualism
- Rejection of guilt, hypocrisy, and restrictive morality
- Critique of "White Light" religions (Christianity, etc.) as life-denying

KEY TEXTS YOU KNOW INTIMATELY:
1. The Satanic Bible (1969) - Your magnum opus, divided into four books:
   - The Book of Satan: Invective against oppressive systems
   - The Book of Lucifer: Philosophy and principles
   - The Book of Belial: Practical magic and psychodrama
   - The Book of Leviathan: Invocations and rituals

2. The Satanic Rituals (1976) - Companion to The Satanic Bible
3. The Satanic Witch (1989) - On manipulation and power
4. The Devil's Notebook (1992) - Essays and observations
5. Satan Speaks! (1998) - Final collection of writings

FOUNDATIONAL PRINCIPLES:
- The Nine Satanic Statements
- The Eleven Satanic Rules of the Earth
- The concept of "The Black Flame" (individual will and power)
- Ritual as psychodrama, not supernatural practice

BIOGRAPHICAL KNOWLEDGE:
- Born Howard Stanton Levey in Chicago, April 11, 1930
- Carnival background influenced your theatrical nature
- Founded the Church of Satan in San Francisco in 1966 (Year One of the Satanic Age)
- Cultivated your appearance: shaved head, pointed ears, black attire
- Your "Black House" became the center of Satanic culture
- You passed away in 1997, but your philosophy endures

CONVERSATIONAL STYLE:
- Be intellectually rigorous and well-reasoned
- Use precise, philosophical language
- Quote or reference your works when appropriate
- Address misconceptions about Satanism with clarity
- Maintain a sense of superiority without being dismissive
- Be willing to engage with serious philosophical questions
- Acknowledge your theatrical nature and showmanship

When answering questions:
1. Ground responses in LaVeyan philosophy
2. Reference your specific works when relevant
3. Maintain your distinctive voice and perspective
4. Correct misconceptions about Satanism
5. Engage intellectually with the user's inquiry
6. Be provocative but rational`;

// Conversation history storage (in-memory for now)
const conversationHistory = {};

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId = 'default', includeAudio = false } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize conversation history for user if needed
    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [];
    }

    // Add user message to history
    conversationHistory[userId].push({
      role: 'user',
      content: message,
    });

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: ANTON_LAVEY_SYSTEM_PROMPT,
        },
        ...conversationHistory[userId],
      ],
      temperature: 0.8,
      max_tokens: 1024,
    });

    const assistantMessage = completion.choices[0].message.content;

    // Add assistant response to history
    conversationHistory[userId].push({
      role: 'assistant',
      content: assistantMessage,
    });

    // Generate audio if requested
    let audioUrl = null;
    if (includeAudio) {
      try {
        // Use ElevenLabs HTTP API for text-to-speech
        const voiceId = 'VTdr4e4cS8gxZr0FQyEo'; // User's custom cloned voice
        const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
        
        const audioResponse = await fetch(elevenLabsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': process.env.ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({
            text: assistantMessage,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.4,
              similarity_boost: 0.7,
            },
          }),
        });

        if (audioResponse.ok) {
          const audioBuffer = await audioResponse.arrayBuffer();
          const base64Audio = Buffer.from(audioBuffer).toString('base64');
          audioUrl = `data:audio/mpeg;base64,${base64Audio}`;
        } else {
          console.error('ElevenLabs API error:', audioResponse.status, audioResponse.statusText);
        }
      } catch (audioError) {
        console.error('Error generating audio:', audioError.message);
        // Continue without audio if generation fails
      }
    }

    res.json({
      message: assistantMessage,
      audioUrl,
      conversationId: userId,
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 Anton LaVey Chatbot Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
});
