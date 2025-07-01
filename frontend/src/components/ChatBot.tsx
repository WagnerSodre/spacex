import { useState } from 'react';
import { API_BASE_URL } from '../config';

export default function ChatBot() {
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Oi! Sou o SpaceXBot. Pergunte-me algo sobre os lançamentos da SpaceX!' }
    ]);
    const [input, setInput] = useState('');
    const [chatOpen, setChatOpen] = useState(false);

    const toggleChat = () => setChatOpen(!chatOpen);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        try {
        const res = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input })
        });

        const data = await res.json();
        setMessages([...newMessages, { role: 'bot', content: data?.reply || 'Erro na resposta' }]);
        } catch {
        setMessages([...newMessages, { role: 'bot', content: 'Erro ao conectar com o servidor' }]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };
  return (
    <div className="chat-container">
        <button className="chat-toggle" onClick={toggleChat}>💬</button>

        {chatOpen && (
            <div className="chatbox">
            <div className="chat-header">Chatbot</div>
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                <div key={idx} className={`chat-msg ${msg.role}`}>{msg.content}</div>
                ))}
            </div>
            <div className="chat-input">
                <input
                type="text"
                placeholder="Digite sua pergunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend}>Enviar</button>
            </div>
            </div>
        )}
    </div>
  );
}
