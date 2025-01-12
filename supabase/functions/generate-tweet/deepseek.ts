export async function generateTweet(topic: string, tone: string) {
  try {
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      throw new Error('DeepSeek API key not configured');
    }

    console.log(`Generating tweet for topic: ${topic} with tone: ${tone}`);

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
            content: `You are a professional content creator specializing in crafting engaging, informative tweets. 
            Your task is to create a detailed, well-structured tweet about the given topic.
            
            Guidelines:
            - Write in a ${tone} tone
            - Keep the content within Twitter's character limit
            - Include relevant hashtags where appropriate
            - Make it engaging and shareable
            - Break complex ideas into digestible points
            - Use clear, concise language
            - Include a call-to-action when relevant
            - Avoid clickbait or sensationalism`
          },
          {
            role: 'user',
            content: `Create an engaging tweet about this topic: ${topic}`
          }
        ],
        temperature: 0.7,
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