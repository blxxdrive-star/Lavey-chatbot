import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import antonImage from '/anton_lavey_avatar.png'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Greetings. I am Anton Szandor LaVey, resurrected. You have summoned me to discourse on the nature of Satanism, the philosophy of self-deification, and the liberation of mankind from the chains of guilt and hypocrisy. What is your inquiry?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(null)
  const messagesEndRef = useRef(null)
  const audioRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5174'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!input.trim()) return

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: input,
        userId: 'default',
        includeAudio: true,
      })

      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: response.data.message,
        audioUrl: response.data.audioUrl,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])

      // Auto-play audio if available
      if (response.data.audioUrl) {
        playAudio(response.data.audioUrl, assistantMessage.id)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: 'An error occurred. The connection to the spiritual realm has been disrupted.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const playAudio = (audioUrl, messageId) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setAudioPlaying(messageId)
    }
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-content">
          <div className="avatar-section">
            <div className="avatar">
              <img src={antonImage} alt="Anton LaVey" className="avatar-image" />
            </div>
          </div>
          <div className="header-text">
            <h1>Anton LaVey</h1>
            <p className="subtitle">High Priest of the Church of Satan</p>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message message-${message.role}`}>
            <div className="message-content">
              {message.role === 'assistant' && (
                <div className="assistant-avatar">
                  <img src={antonImage} alt="Anton LaVey" className="avatar-image" />
                </div>
              )}
              <div className="message-text">
                <p>{message.content}</p>
                {message.audioUrl && (
                  <button
                    className="audio-button"
                    onClick={() => playAudio(message.audioUrl, message.id)}
                    title="Play audio response"
                  >
                    🔊 Listen
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message message-assistant">
            <div className="message-content">
              <div className="assistant-avatar">🔥</div>
              <div className="message-text">
                <p className="loading-text">Summoning the dark wisdom...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Anton about Satanism, philosophy, or his works..."
          disabled={loading}
          className="message-input"
        />
        <button type="submit" disabled={loading} className="send-button">
          {loading ? '⏳' : '✉️'}
        </button>
      </form>

      <audio ref={audioRef} onEnded={() => setAudioPlaying(null)} />
    </div>
  )
}

export default App
