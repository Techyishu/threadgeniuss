export async function generateTweet(transcript: string, title: string, tone = 'professional', isPro = false) {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const baseInstructions = `
    You are an expert social media content creator specializing in creating viral tweets.
    Based on the following YouTube video title and transcript, create an engaging tweet.
    
    Follow these guidelines:
    1. Start with a hook that grabs attention
    2. Include specific, actionable insights
    3. Use emojis strategically to add visual interest 🎯
    4. Keep the tweet under 280 characters
    5. End with a strong call-to-action or question
  `;

  const proEnhancements = isPro ? `
    Additional pro guidelines:
    1. Customize tone to be ${tone}
    2. Include data-driven insights when relevant
    3. Add industry-specific hashtags
    4. Structure content for maximum virality
  ` : '';

  const freeConstraints = !isPro ? `
    Constraints for free version:
    1. Keep tone professional and straightforward
    2. Focus on core insights only
    3. Use basic formatting
    4. Include only essential information
  ` : '';

  const prompt = `
    ${baseInstructions}
    ${proEnhancements}
    ${freeConstraints}
    
    Title: ${title}
    Transcript: ${transcript}
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert social media manager specializing in creating viral tweets.'
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
    console.error('Error generating tweet with OpenAI:', error);
    throw new Error(`Failed to generate tweet: ${error.message}`);
  }
}