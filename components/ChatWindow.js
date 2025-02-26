// components/ChatWindow.js
export default function ChatWindow({ messages }) {
    return (
        <div>
            {messages.map((msg, idx) => (
                <p key={idx} style={{ textAlign: msg.sender === 'bot' ? 'left' : 'right' }}>
                    <strong>{msg.sender}: </strong>{msg.text}
                </p>
            ))}
        </div>
    );
}
