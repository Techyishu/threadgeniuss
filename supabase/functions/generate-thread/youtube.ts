import { YoutubeTranscript } from "npm:youtube-transcript";

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
  console.log('Starting transcript fetch for:', videoUrl);
  
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    console.error('Invalid YouTube URL:', videoUrl);
    throw new Error('Invalid YouTube URL');
  }

  try {
    // First get video details using YouTube API
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    const details = await detailsResponse.json();
    
    if (!details.items?.[0]) {
      console.error('Video not found:', details);
      throw new Error('Video not found');
    }

    const title = details.items[0]?.snippet?.title;
    console.log('Got video title:', title);

    // Now fetch transcript using youtube-transcript
    console.log('Fetching transcript for video ID:', videoId);
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
    
    if (!transcriptItems || transcriptItems.length === 0) {
      console.error('No transcript available for this video');
      throw new Error('No transcript available for this video');
    }

    // Combine all transcript text
    const transcriptText = transcriptItems
      .map(item => item.text)
      .join(' ');

    console.log('Successfully retrieved transcript');
    
    return {
      title,
      transcript: transcriptText
    };
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw new Error(`Failed to fetch transcript: ${error.message}`);
  }
}