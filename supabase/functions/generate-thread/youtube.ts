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

    // Try multiple transcript APIs for better reliability
    const apis = [
      `https://youtube-transcript-api.vercel.app/api/transcript/${videoId}`,
      `https://youtube-transcript.vercel.app/api/transcript/${videoId}`,
      `https://yt-transcript.p.rapidapi.com/transcript/${videoId}?lang=en`
    ];

    let transcript = null;
    let error = null;

    for (const apiUrl of apis) {
      try {
        console.log('Attempting to fetch transcript from:', apiUrl);
        const headers: Record<string, string> = {};
        
        // Add RapidAPI headers if using their endpoint
        if (apiUrl.includes('rapidapi.com')) {
          headers['X-RapidAPI-Key'] = 'YOUR-RAPIDAPI-KEY'; // This is optional, will be skipped if key not provided
          headers['X-RapidAPI-Host'] = 'yt-transcript.p.rapidapi.com';
        }

        const response = await fetch(apiUrl, { headers });
        
        if (!response.ok) {
          console.log(`Failed to fetch from ${apiUrl}:`, response.status);
          continue;
        }

        const data = await response.json();
        
        if (Array.isArray(data)) {
          // Handle array format (youtube-transcript.vercel.app)
          transcript = data
            .map((item: { text: string }) => item.text)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
        } else if (data.transcript) {
          // Handle object format (rapidapi)
          transcript = data.transcript;
        }

        if (transcript) {
          console.log('Successfully retrieved transcript');
          break;
        }
      } catch (e) {
        error = e;
        console.error(`Error fetching from ${apiUrl}:`, e);
        continue;
      }
    }

    if (!transcript) {
      throw error || new Error('Failed to fetch transcript from all available sources');
    }

    return {
      title,
      transcript
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw new Error(`Failed to fetch YouTube data: ${error.message}`);
  }
}