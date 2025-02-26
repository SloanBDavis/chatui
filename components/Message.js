const Message = ({ message, onRewind, canRegenerate, onRegenerate }) => {
    const { sender, text } = message;

    const copyMessage = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className={`message ${sender}`}>
            <div className="message-content">
                <div className="sender">{sender === 'user' ? 'You' : 'AI'}</div>
                <div className="text">{text}</div>
                <div className="actions">
                    <button onClick={copyMessage} className="action-btn">
                        Copy
                    </button>
                    <button onClick={onRewind} className="action-btn">
                        Rewind here
                    </button>
                    {canRegenerate && (
                        <button onClick={onRegenerate} className="action-btn regenerate">
                            Regenerate response
                        </button>
                    )}
                </div>
            </div>
            <style jsx>{`
                .message {
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 8px;
                    max-width: 80%;
                }
                
                .user {
                    background-color: #e3f2fd;
                    margin-left: auto;
                }
                
                .bot {
                    background-color: #f5f5f5;
                    margin-right: auto;
                }
                
                .message-content {
                    display: flex;
                    flex-direction: column;
                }
                
                .sender {
                    font-weight: bold;
                    margin-bottom: 4px;
                    font-size: 0.9em;
                }
                
                .text {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    margin-bottom: 8px;
                }

                .actions {
                    display: flex;
                    gap: 8px;
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                .message:hover .actions {
                    opacity: 1;
                }

                .action-btn {
                    padding: 4px 8px;
                    font-size: 0.8em;
                    border: none;
                    border-radius: 4px;
                    background: #ffffff80;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .action-btn:hover {
                    background: #ffffff;
                }

                .regenerate {
                    background: #e3f2fd;
                    color: #0070f3;
                }

                .regenerate:hover {
                    background: #bbdefb;
                }
            `}</style>
        </div>
    );
};

export default Message;
