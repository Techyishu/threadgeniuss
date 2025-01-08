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

    // Use youtube-transcript API (no auth required)
    const transcriptResponse = await fetch(
      `https://youtube-transcript.vercel.app/api/transcript/${videoId}`
    );

    if (!transcriptResponse.ok) {
      throw new Error('Failed to fetch transcript');
    }

    const transcriptData = await transcriptResponse.json();
    
    if (!transcriptData || transcriptData.length === 0) {
      throw new Error('No transcript available for this video');
    }

    // Combine all text segments into one transcript
    const transcript = transcriptData
      .map((item: { text: string }) => item.text)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    console.log('Successfully retrieved transcript');

    return {
      title,
      transcript
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw new Error(`Failed to fetch YouTube data: ${error.message}`);
  }
}