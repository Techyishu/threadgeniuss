export function extractVideoId(url: string): string | null {
  const patterns = [
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&.*)?$/,
    /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/,
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})(?:\?.*)?$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

export async function getYouTubeTranscript(videoUrl: string, apiKey: string) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  console.log('Extracting transcript for video ID:', videoId);

  try {
    // First get video details for the title
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    
    if (!detailsResponse.ok) {
      console.error('Failed to fetch video details:', await detailsResponse.text());
      throw new Error('Failed to fetch video details');
    }

    const details = await detailsResponse.json();
    console.log('Video details response:', details);

    if (!details.items?.[0]) {
      throw new Error('Video not found');
    }

    const title = details.items[0]?.snippet?.title;

    // Use a more reliable transcript API
    const transcriptUrl = `https://youtube-transcript-api.p.rapidapi.com/v1/transcript/${videoId}?lang=en`;
    
    console.log('Fetching transcript from:', transcriptUrl);
    
    const response = await fetch(transcriptUrl, {
      headers: {
        'X-RapidAPI-Host': 'youtube-transcript-api.p.rapidapi.com',
        'X-RapidAPI-Key': Deno.env.get('RAPIDAPI_KEY') || '',
      },
    });

    if (!response.ok) {
      console.error('Transcript API error:', await response.text());
      throw new Error('Failed to fetch transcript');
    }

    const data = await response.json();
    
    if (!data || !data.transcript) {
      throw new Error('No transcript available for this video');
    }

    console.log('Successfully retrieved transcript');
    
    return {
      title,
      transcript: data.transcript
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw new Error(`Failed to fetch YouTube data: ${error.message}`);
  }
}