export async function generateTweet(topic: string, tone: string = 'professional') {
  try {
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      throw new Error('DeepSeek API key not configured');
    }

    const systemPrompt = `You are a highly skilled social media content creator specializing in creating engaging, informative, and viral-worthy long-form tweets. Your goal is to create content that educates, entertains, and encourages sharing.

Guidelines for tweet creation:
- Start with a strong hook that captures attention in the first line
- Break down complex topics into digestible chunks
- Use clear, concise language while maintaining depth
- Include relevant statistics or facts when applicable
- End with a thought-provoking question or call-to-action
- Maintain a ${tone} tone throughout
- Format the content with appropriate line breaks for readability
- Keep the length between 500-1000 characters
- Add 2-3 relevant hashtags at the end
- Avoid clickbait or sensationalism while remaining engaging

Remember to:
- Focus on providing value to the reader
- Create a natural flow of information
- Use storytelling techniques when appropriate
- Make complex topics accessible
- Encourage discussion and engagement`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Create an engaging and informative long-form tweet about: ${topic}`
          }
        ],
        temperature: 0.7, // Add some creativity while maintaining coherence
        max_tokens: 1000, // Ensure we have enough space for a detailed response
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('DeepSeek API error:', error);
      throw new Error(`DeepSeek API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content;
  } catch (error) {
    console.error('Error generating tweet with DeepSeek:', error);
    throw error;
  }
}