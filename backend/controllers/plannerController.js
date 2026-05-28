const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.planTasks = async (req, res) => {
    try {
        const { tasks, period } = req.body;

        if (!tasks) {
            return res.status(400).json({ error: 'Tasks are required' });
        }

        const taskList = tasks.split('\n').filter(task => task.trim());
        const periodType = period === 'weekly' ? 'weekly' : 'daily';

        const prompt = `I have the following tasks that need to be planned:
${taskList.map((task, i) => `${i + 1}. ${task}`).join('\n')}

Please provide:
1. Priority Ranking: Rank these tasks by importance and urgency
2. ${periodType.charAt(0).toUpperCase() + periodType.slice(1)} Schedule: Create a ${periodType} schedule/plan for completing these tasks with estimated time allocations

Consider deadlines, complexity, and dependencies when prioritizing.`;

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert productivity and time management consultant. Create prioritized task plans that help users manage their workload efficiently. Consider urgency, importance, dependencies, and realistic time allocations.`
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1500
        });

        const fullResponse = response.data.choices[0].message.content;

        // Parse the response
        const priority = extractList(fullResponse, 'Priority Ranking');
        const schedule = extractSection(fullResponse, periodType.charAt(0).toUpperCase() + periodType.slice(1) + ' Schedule');

        res.json({
            priority,
            schedule
        });
    } catch (error) {
        console.error('Error planning tasks:', error);
        res.status(500).json({ error: 'Failed to create task plan' });
    }
};

function extractSection(text, sectionName) {
    const regex = new RegExp(`${sectionName}[:\\s]+(.*?)(?=\\n\\d+\\.|$)`, 'is');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
}

function extractList(text, sectionName) {
    const regex = new RegExp(`${sectionName}[:\\s]+(.*?)(?=\\n[A-Z]|\\n\\d+\\.|$)`, 'is');
    const match = text.match(regex);
    if (!match) return [];

    const items = match[1].split('\n').filter(line => line.trim());
    return items.map(item => item.replace(/^[-•*\d.]\s*/, '').trim()).filter(item => item);
}
