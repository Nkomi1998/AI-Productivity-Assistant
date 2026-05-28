const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateEmail = async (req, res) => {
    try {
        const { purpose, tone, details } = req.body;

        if (!purpose) {
            return res.status(400).json({ error: 'Email purpose is required' });
        }

        const prompt = `Write a professional ${tone} email for the following purpose: ${purpose}${
            details ? `\nAdditional details: ${details}` : ''
        }`;

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional email writing assistant. Generate well-structured, professional emails.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        const email = response.data.choices[0].message.content;

        res.json({ email });
    } catch (error) {
        console.error('Error generating email:', error);
        res.status(500).json({ error: 'Failed to generate email' });
    }
};
