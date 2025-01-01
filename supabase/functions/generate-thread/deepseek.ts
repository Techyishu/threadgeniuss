export async function generateThread(transcript: string, title: string, tone = 'professional', threadSize = 'medium') {
  const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
  if (!deepseekApiKey) {
    throw new Error('DeepSeek API key not configured');
  }

  const getTweetCount = (size: string) => {
    switch (size) {
      case 'short': return 5;
      case 'long': return 15;
      default: return 10; // medium
    }
  };

  const tweetCount = getTweetCount(threadSize);

  const baseInstructions = `
    You are an expert social media content creator specializing in creating viral Twitter threads.
    Based on the following YouTube video title and transcript, create an engaging Twitter thread with EXACTLY ${tweetCount} tweets.
    
    Follow these guidelines:
    1. Start with a hook that grabs attention and promises value
    2. Each tweet should be self-contained but flow naturally to the next
    3. Use emojis strategically to add visual interest 🎯
    4. Include specific, actionable insights
    5. End with a strong call-to-action
    6. Keep each tweet under 280 characters
    7. Format each tweet exactly like this:

    1/${tweetCount}
    [First tweet content]

    2/${tweetCount}
    [Second tweet content]

    ${tweetCount}/${tweetCount}
    [Final tweet content with call-to-action]
  `;

  const prompt = `
    ${baseInstructions}
    
    Title: ${title}
    Transcript: ${transcript}
  `;

  try {
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
            content: 'You are an expert social media manager specializing in creating viral Twitter threads.'
          },
          { role: 'user', content: prompt }
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
    console.error('Error generating thread with DeepSeek:', error);
    throw new Error(`Failed to generate thread: ${error.message}`);
  }
}