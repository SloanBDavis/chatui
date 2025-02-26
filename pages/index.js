// pages/index.js
import { useState } from 'react';
import axios from 'axios';
import ChatWindow from '../components/ChatWindow';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [provider, setProvider] = useState('openai');

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await axios.post(`/api/${provider}`, { prompt: input });
            const botMessage = {
                sender: 'bot',
                text: response.data.choices[0].message.content
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
        setInput('');
    };

    return (
        <div>
            <h1>LLM Chat UI</h1>
            <select value={provider} onChange={(e) => setProvider(e.target.value)}>
                <option value="openai">OpenAI</option>
                <option value="gemini">Gemini</option>
                <option value="claude">Claude</option>
            </select>
            <ChatWindow messages={messages} />
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
