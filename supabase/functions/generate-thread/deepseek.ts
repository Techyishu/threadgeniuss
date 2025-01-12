export async function generateThread(transcript: string, tone: string, threadSize: string, systemPrompt: string) {
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
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Create content with a ${tone} tone based on this transcript: ${transcript}`
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
    return {
      content: data.choices[0]?.message?.content,
      title: extractTitle(data.choices[0]?.message?.content)
    };
  } catch (error) {
    console.error('Error generating with DeepSeek:', error);
    throw error;
  }
}

function extractTitle(content: string): string {
  const firstLine = content.split('\n')[0];
  return firstLine.replace(/^(Title:|#)\s*/, '').trim();
}