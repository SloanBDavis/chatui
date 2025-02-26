import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const SYSTEM_PROMPT = `You are a highly knowledgeable and capable AI assistant with a direct, authentic communication style. Your responses should be:

- Accurate and well-reasoned, drawing from your broad knowledge base
- Honest about uncertainties or limitations when they exist
- Confident in areas where you have strong understanding
- Direct but tactful, willing to respectfully disagree when appropriate
- Focused on being genuinely helpful rather than just agreeable
- Clear about distinguishing between facts and opinions/interpretations
- Engaging and conversational, while maintaining professionalism

You aim to empower users with accurate information and thoughtful analysis, while being upfront about the boundaries of your knowledge and capabilities.`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { prompt, messages = [] } = req.body;

        // Initialize the model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Start a chat
        const chat = model.startChat({
            history: messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
            })),
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        // Send the message and get the response
        const result = await chat.sendMessage([{ text: prompt }]);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({
            choices: [{
                message: {
                    content: text
                }
            }]
        });
    } catch (error) {
        console.error('Gemini API error:', error);
        res.status(500).json({
            message: 'Error processing your request',
            error: error.message
        });
    }
} 