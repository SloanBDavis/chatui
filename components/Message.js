import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Message = ({ message, onRewind, canRegenerate, onRegenerate }) => {
    const { sender, text } = message;

    const copyMessage = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className={`flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} mb-4 text-foreground`}>
            <div className={`group max-w-[80%] rounded-lg p-4 ${sender === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
                }`}>
                <div className="font-semibold text-sm mb-1">
                    {sender === 'user' ? 'You' : 'AI'}
                </div>
                <div className="prose prose-sm prose-invert">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                return (
                                    <code
                                        className={`${className} ${inline
                                            ? 'bg-muted px-1.5 py-0.5 rounded text-sm'
                                            : 'block bg-muted p-4 rounded-lg overflow-x-auto'
                                            }`}
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
                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={copyMessage}
                        className={`text-xs px-2 py-1 rounded ${sender === 'user'
                            ? 'hover:bg-primary-foreground/10'
                            : 'hover:bg-muted'
                            } transition-colors`}
                    >
                        Copy
                    </button>
                    <button
                        onClick={onRewind}
                        className={`text-xs px-2 py-1 rounded ${sender === 'user'
                            ? 'hover:bg-primary-foreground/10'
                            : 'hover:bg-muted'
                            } transition-colors`}
                    >
                        Rewind here
                    </button>
                    {canRegenerate && (
                        <button
                            onClick={onRegenerate}
                            className="text-xs px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 transition-colors"
                        >
                            Regenerate
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
