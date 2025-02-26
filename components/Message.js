import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Message = ({ message, onRewind, canRegenerate, onRegenerate }) => {
    const { sender, text } = message;

    const copyMessage = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className={`message ${sender}`}>
            <div className="message-content">
                <div className="sender">{sender === 'user' ? 'You' : 'AI'}</div>
                <div className="text">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Style code blocks
                            code({ node, inline, className, children, ...props }) {
                                return (
                                    <code
                                        className={`${className} ${inline ? 'inline-code' : 'code-block'}`}
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {text}
                    </ReactMarkdown>
                </div>
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
            `}</style>
            <style jsx global>{`
                .text {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    margin-bottom: 8px;
                }

                .text p {
                    margin: 0.5em 0;
                }

                .text p:first-child {
                    margin-top: 0;
                }

                .text p:last-child {
                    margin-bottom: 0;
                }

                .text ul, .text ol {
                    margin: 0.5em 0;
                    padding-left: 1.5em;
                }

                .text li {
                    margin: 0.2em 0;
                }

                .code-block {
                    display: block;
                    background-color: #f8f9fa;
                    padding: 0.75em 1em;
                    margin: 0.5em 0;
                    border-radius: 4px;
                    font-family: monospace;
                    white-space: pre;
                    overflow-x: auto;
                }

                .inline-code {
                    background-color: #f8f9fa;
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                    font-family: monospace;
                }

                .text a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .text a:hover {
                    text-decoration: underline;
                }

                .text blockquote {
                    margin: 0.5em 0;
                    padding-left: 1em;
                    border-left: 3px solid #ccc;
                    color: #666;
                }

                .text table {
                    border-collapse: collapse;
                    margin: 0.5em 0;
                    width: 100%;
                }

                .text th, .text td {
                    border: 1px solid #ddd;
                    padding: 0.5em;
                    text-align: left;
                }

                .text th {
                    background-color: #f8f9fa;
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
