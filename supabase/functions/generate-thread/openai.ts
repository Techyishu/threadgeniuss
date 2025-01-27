export async function generateThread(transcript: string, title: string, tone = 'professional', threadSize = 'medium') {
  console.log('Starting thread generation with OpenAI');
  
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const getTweetCount = (size: string) => {
    switch (size) {
      case 'short': return 5;
      case 'long': return 15;
      default: return 10; // medium
    }
  };

  const getToneInstructions = (tone: string) => {
    switch (tone) {
      case 'professional':
        return 'Use a professional and authoritative tone. Focus on industry insights and expert analysis.';
      case 'casual':
        return 'Write in a relaxed, conversational tone. Use simple language and be friendly, as if chatting with a friend.';
      case 'humorous':
        return 'Keep it light and fun. Add appropriate humor and witty observations. Use casual language and occasional emojis for entertainment.';
      case 'educational':
        return 'Focus on teaching and explaining concepts clearly. Break down complex ideas into simple terms and use examples.';
      default:
        return 'Use a professional and clear tone.';
    }
  };

  const tweetCount = getTweetCount(threadSize);
  const toneInstructions = getToneInstructions(tone);

  const baseInstructions = `
    You are a skilled social media content creator who writes engaging Twitter threads that feel naturally human-written.
    Create a ${tweetCount}-tweet thread based on this YouTube video titled "${title}".

    ${toneInstructions}

    Follow these guidelines for a natural, human-like thread:
    1. Start with a compelling hook that makes people want to read more
    2. Write like a real person - use contractions, simple words, and natural language
    3. Add personality with strategic emoji use 🎯 (but don't overdo it)
    4. Share practical insights people can actually use
    5. Include relevant examples or stories from the video
    6. End with a clear takeaway or call-to-action
    7. Keep each tweet under 280 characters
    8. Make the thread flow naturally from one tweet to the next
    9. Avoid jargon or overly complex language
    10. Write in a way that feels like a friend sharing valuable insights

    Format each tweet exactly like this:

    1/${tweetCount}
    [First tweet content]

    2/${tweetCount}
    [Second tweet content]

    ${tweetCount}/${tweetCount}
    [Final tweet with key takeaway]
  `;

  const prompt = `
    ${baseInstructions}
    
    Video Title: ${title}
    Video Transcript: ${transcript}

    Remember to maintain the specified ${tone} tone throughout the thread.
  `;

  try {
    console.log('Making request to OpenAI API');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert social media manager who writes engaging, human-like Twitter threads that provide real value to readers.'
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
    console.log('Successfully received response from OpenAI');
    return data.choices[0]?.message?.content;
  } catch (error) {
    console.error('Error generating thread with OpenAI:', error);
    throw new Error(`Failed to generate thread: ${error.message}`);
  }
}