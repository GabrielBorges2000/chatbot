'use client'

import React, { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'

export function AiStockChat() {
  const [messages, setMessages] = useState([
    { sender: 'ai', content: 'Olá! Como posso ajudar você com a consulta de estoque hoje? Você gostaria de:' },
  ])
  const [input, setInput] = useState('')

  const suggestions = ['Verificar quantidade', 'Localizar item', 'Preço do produto']

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', content: input }])
      setInput('')
      
      // Simula resposta da AI
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'ai', 
          content: `Entendi que você quer ${input.toLowerCase()}. Aqui está a informação que você precisa...` 
        }])
      }, 1000)
    }
  }

  const handleSuggestion = (suggestion: string) => {
    setMessages([...messages, { sender: 'user', content: suggestion }])
    
    // Simula resposta da AI
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        content: `Claro, posso ajudar você a ${suggestion.toLowerCase()}. O que você gostaria de saber especificamente?` 
      }])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-xl font-bold">Consulta de Estoque AI</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-lg ${
              message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}>
              <div className="flex items-center space-x-2 mb-1">
                {message.sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
                <span className="font-semibold">{message.sender === 'ai' ? 'AI' : 'Você'}</span>
              </div>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      {messages.length === 1 && (
        <div className="p-4 space-y-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestion(suggestion)}
              className="w-full bg-blue-100 text-blue-800 p-2 rounded-lg text-left hover:bg-blue-200 transition"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}