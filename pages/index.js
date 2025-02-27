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
        <div className="container mx-auto max-w-3xl px-4 py-8 min-h-screen bg-background text-foreground">
            <h1 className="text-2xl font-bold mb-6">LLM Chat UI</h1>
            <div className="flex gap-4 mb-6">
                <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="px-3 py-2 rounded-md border border-input bg-background"
                    disabled={isGenerating}
                >
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Gemini</option>
                    <option value="claude">Claude</option>
                </select>
                <button
                    onClick={clearChat}
                    className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
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
            <form onSubmit={sendMessage} className="flex gap-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                    disabled={isGenerating}
                />
                <button
                    type="submit"
                    className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                    disabled={isGenerating}
                >
                    {isGenerating ? 'Generating...' : 'Send'}
                </button>
            </form>
        </div>
    );
}
