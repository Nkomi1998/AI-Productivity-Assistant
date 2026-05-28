const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.summarizeNotes = async (req, res) => {
    try {
        const { notes } = req.body;

        if (!notes) {
            return res.status(400).json({ error: 'Meeting notes are required' });
        }

        const prompt = `Please analyze the following meeting notes and provide:
1. A concise summary of the meeting (2-3 sentences)
2. Action items (list each as a separate item)
3. Any deadlines mentioned
4. Key decisions made

Meeting Notes:
${notes}

Please format your response clearly with sections for Summary, Action Items, Deadlines, and Decisions Made.`;

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert meeting notes analyzer. Extract key information, action items, deadlines, and decisions from meeting notes.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        });

        const fullResponse = response.data.choices[0].message.content;

        // Parse the response (basic parsing - in production, use more robust parsing)
        const summary = extractSection(fullResponse, 'Summary');
        const actionItems = extractList(fullResponse, 'Action Items');
        const deadlines = extractList(fullResponse, 'Deadlines');
        const decisions = extractList(fullResponse, 'Decisions Made');

        res.json({
            summary,
            actionItems,
            deadlines,
            decisions
        });
    } catch (error) {
        console.error('Error summarizing notes:', error);
        res.status(500).json({ error: 'Failed to summarize notes' });
    }
};

function extractSection(text, sectionName) {
    const regex = new RegExp(`${sectionName}[:\\s]+(.*?)(?=\\n[A-Z]|$)`, 'is');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
}

function extractList(text, sectionName) {
    const regex = new RegExp(`${sectionName}[:\\s]+(.*?)(?=\\n[A-Z]|$)`, 'is');
    const match = text.match(regex);
    if (!match) return [];

    const items = match[1].split('\n').filter(line => line.trim());
    return items.map(item => item.replace(/^[-•*]\s*/, '').trim()).filter(item => item);
}
