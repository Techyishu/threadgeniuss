export async function generateThread(transcript: string, title: string) {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `
    Based on the following YouTube video transcript and title, create an engaging Twitter thread.
    Format it as a numbered list where each item represents one tweet.
    Keep each tweet within 280 characters.
    Make it informative and engaging.
    
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
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
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