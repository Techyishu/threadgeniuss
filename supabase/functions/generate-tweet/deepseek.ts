export async function generateTweet(transcript: string, title: string) {
  try {
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      throw new Error('DeepSeek API key not configured');
    }

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
            content: 'You are a helpful assistant that creates engaging tweets based on video content. Keep tweets within 280 characters and make them engaging and informative.'
          },
          {
            role: 'user',
            content: `Create a tweet based on this video titled "${title}". Here's the transcript: ${transcript}`
          }
        ],
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