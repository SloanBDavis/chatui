// components/ChatWindow.js
import Message from './Message';

const ChatWindow = ({ messages, onRewind, onRegenerate }) => {
    return (
        <div className="h-[400px] overflow-y-auto p-4 mb-6 border border-border rounded-lg">
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
        </div>
    );
};

export default ChatWindow;
