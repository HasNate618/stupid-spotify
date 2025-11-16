'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  isBot: boolean;
}

// Custom event for external bot messages
export const triggerBotMessage = (message: string) => {
  window.dispatchEvent(new CustomEvent('bot-message', { detail: message }));
};

export function GaslightBot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm here to help! 🤖", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for external bot messages
  useEffect(() => {
    const handleBotMessage = (event: CustomEvent<string>) => {
      const botMessage: Message = { text: event.detail, isBot: true };
      setMessages(prev => [...prev, botMessage]);
      setIsOpen(true); // Open chat when bot speaks
    };

    window.addEventListener('bot-message', handleBotMessage as EventListener);
    return () => {
      window.removeEventListener('bot-message', handleBotMessage as EventListener);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    
    // Add user message
    const userMessage: Message = { text: currentInput, isBot: false };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Call the API route with updated messages including the new user message
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: currentInput,
          conversationHistory: updatedMessages.slice(1).map(msg => ({
            role: msg.isBot ? 'assistant' : 'user',
            content: msg.text
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const botMessage: Message = { text: data.message, isBot: true };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Fallback response
      const fallbackMessage: Message = { 
        text: "Bruh, the AI's bussin' fr. Try again later, no cap. 🤷", 
        isBot: true 
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div 
      className="fixed right-4 top-4 z-50"
      style={{ width: '320px' }}
    >
      <div 
        className="bg-yellow-300 border-8 border-double"
        style={{
          borderColor: '#ff00ff #00ff00 #ff00ff #00ff00',
          boxShadow: '10px 10px 0px #000',
        }}
      >
        {/* Header */}
        <div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 flex justify-between items-center border-b-4 border-black cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="text-xl font-black text-white" style={{ fontFamily: '"Arial Black", sans-serif' }}>
              AI HELP BOT
            </span>
          </div>
          <button className="text-white text-2xl font-black">
            {isOpen ? '−' : '+'}
          </button>
        </div>

        {/* Chat Body */}
        {isOpen && (
          <>
            <div 
              className="bg-white p-4 overflow-y-auto border-b-4 border-black"
              style={{ 
                height: '400px',
                backgroundImage: 'repeating-linear-gradient(0deg, #f0f0f0, #f0f0f0 10px, #ffffff 10px, #ffffff 20px)',
              }}
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`mb-3 ${msg.isBot ? 'text-left' : 'text-right'}`}
                >
                  <div 
                    className={`inline-block p-3 max-w-[80%] border-4 ${
                      msg.isBot 
                        ? 'bg-lime-300 border-green-600' 
                        : 'bg-pink-300 border-pink-600'
                    }`}
                    style={{
                      boxShadow: '4px 4px 0px #000',
                      fontFamily: '"Comic Sans MS", cursive',
                      fontWeight: 'bold',
                      color: '#ff1493',
                    }}
                  >
                    {msg.isBot && <span className="mr-1">🤖</span>}
                    {msg.text}
                    {!msg.isBot && <span className="ml-1">😤</span>}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-left mb-3">
                  <div 
                    className="inline-block p-3 bg-lime-300 border-4 border-green-600"
                    style={{
                      boxShadow: '4px 4px 0px #000',
                      fontFamily: '"Comic Sans MS", cursive',
                      fontWeight: 'bold',
                    }}
                  >
                    🤖 Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-cyan-400 border-t-4 border-black">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your complaint..."
                  disabled={isLoading}
                  className="flex-1 p-2 border-4 border-black font-bold disabled:opacity-50"
                  style={{
                    fontFamily: '"Comic Sans MS", cursive',
                    boxShadow: 'inset 3px 3px 0px rgba(0,0,0,0.3)',
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-red-500 text-white px-4 py-2 border-4 border-black font-black hover:bg-red-600 disabled:opacity-50"
                  style={{
                    fontFamily: '"Impact", sans-serif',
                    boxShadow: '4px 4px 0px #000',
                  }}
                >
                  {isLoading ? '...' : 'SEND'}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div 
              className="bg-black text-lime-400 text-center py-2 text-xs font-bold"
              style={{ fontFamily: 'monospace' }}
            >
              ⚡ POWERED BY STUPID AI ⚡
            </div>
          </>
        )}
      </div>
    </div>
  );
}
