export async function generateThread(transcript: string, title: string) {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `
    You are an expert social media content creator specializing in creating viral Twitter threads.
    Based on the following YouTube video title and transcript, create an engaging Twitter thread with EXACTLY 5 tweets.
    
    Follow these guidelines:
    1. Start with a hook that grabs attention and promises value
    2. Each tweet should be self-contained but flow naturally to the next
    3. Use emojis strategically to add visual interest 🎯
    4. Include specific, actionable insights
    5. End with a strong call-to-action
    6. Keep each tweet under 280 characters
    7. Number each tweet (1/5, 2/5, etc.)
    8. Use line breaks strategically for readability
    
    Title: ${title}
    Transcript: ${transcript}
    
    Format the thread as a numbered list, with each number representing one tweet.
    Make sure to create EXACTLY 5 tweets, no more, no less.
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert social media manager known for creating viral Twitter threads that provide value while maintaining engagement.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content;
  } catch (error) {
    console.error('Error generating thread with OpenAI:', error);
    throw new Error(`Failed to generate thread: ${error.message}`);
  }
}