// components/ChatWindow.js
import Message from './Message';

const ChatWindow = ({ messages, onRewind, onRegenerate }) => {
    return (
        <div className="chat-window">
            {messages.map((message, index) => {
                // Show regenerate option if it's a user message at the end
                const isLastMessage = index === messages.length - 1;
                const canRegenerate = isLastMessage && message.sender === 'user';

                return (
                    <Message
                        key={index}
                        message={message}
                        onRewind={() => onRewind(index)}
                        canRegenerate={canRegenerate}
                        onRegenerate={onRegenerate}
                    />
                );
            })}
            <style jsx>{`
                .chat-window {
                    height: 400px;
                    overflow-y: auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    margin: 20px 0;
                }
            `}</style>
        </div>
    );
};

export default ChatWindow;
