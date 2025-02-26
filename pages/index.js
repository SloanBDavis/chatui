// pages/index.js
import { useState } from 'react';
import axios from 'axios';
import ChatWindow from '../components/ChatWindow';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [provider, setProvider] = useState('openai');
    const [isGenerating, setIsGenerating] = useState(false);

    const clearChat = () => {
        setMessages([]);
    };

    const handleRewind = (index) => {
        setMessages(messages.slice(0, index + 1));
    };

    const generateResponse = async (promptText, messageHistory = []) => {
        setIsGenerating(true);
        try {
            const response = await axios.post(`/api/${provider}`, {
                prompt: promptText,
                messages: messageHistory
            });
            const botMessage = {
                sender: 'bot',
                text: response.data.choices[0].message.content
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error generating response:', error);
        }
        setIsGenerating(false);
    };

    const handleRegenerate = async () => {
        if (messages.length === 0 || isGenerating) return;

        const lastMessage = messages[messages.length - 1];
        if (lastMessage.sender !== 'user') return;

        // Pass all messages up to this point as context
        await generateResponse(lastMessage.text, messages.slice(0, -1));
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isGenerating) return;

        const userMessage = { sender: 'user', text: input };
        // Add user message to messages first
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');

        // Pass all messages INCLUDING the new user message
        await generateResponse(input, newMessages);
    };

    return (
        <div className="container">
            <h1>LLM Chat UI</h1>
            <div className="controls">
                <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="provider-select"
                    disabled={isGenerating}
                >
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Gemini</option>
                    <option value="claude">Claude</option>
                </select>
                <button
                    onClick={clearChat}
                    className="clear-btn"
                    disabled={isGenerating}
                >
                    Clear Chat
                </button>
            </div>
            <ChatWindow
                messages={messages}
                onRewind={handleRewind}
                onRegenerate={handleRegenerate}
            />
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isGenerating}
                />
                <button type="submit" disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Send'}
                </button>
            </form>
            <style jsx>{`
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .controls {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .provider-select {
                    padding: 8px;
                    border-radius: 4px;
                }

                .clear-btn {
                    padding: 8px 16px;
                    background-color: #ff4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .clear-btn:hover {
                    background-color: #cc0000;
                }

                form {
                    display: flex;
                    gap: 10px;
                }

                input {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                button {
                    padding: 10px 20px;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #0051a2;
                }

                button:disabled,
                input:disabled,
                select:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
}
