import { corsHeaders } from './cors.ts';

export async function getYouTubeTranscript(youtubeUrl: string, apiKey: string) {
  try {
    const videoId = extractVideoId(youtubeUrl);
    console.log('Fetching details for video ID:', videoId);

    // First, get video details to get the title
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    
    if (!detailsResponse.ok) {
      console.error('Failed to fetch video details:', await detailsResponse.text());
      throw new Error('Failed to fetch video details');
    }

    const detailsData = await detailsResponse.json();
    
    if (!detailsData.items?.[0]?.snippet) {
      console.error('Video details response:', detailsData);
      throw new Error('Failed to fetch video details');
    }

    const title = detailsData.items[0].snippet.title;
    console.log('Retrieved video title:', title);

    // Then, get captions
    const captionsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`
    );

    if (!captionsResponse.ok) {
      console.error('Failed to fetch captions:', await captionsResponse.text());
      throw new Error('Failed to fetch video captions');
    }

    const captionsData = await captionsResponse.json();

    if (!captionsData.items?.[0]) {
      console.error('No captions found:', captionsData);
      throw new Error('No captions found for this video');
    }

    // Get the first available caption track
    const captionId = captionsData.items[0].id;
    console.log('Found caption track ID:', captionId);

    // Get the actual transcript
    const transcriptResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${apiKey}`
    );
    
    if (!transcriptResponse.ok) {
      console.error('Failed to fetch transcript:', await transcriptResponse.text());
      throw new Error('Failed to fetch video transcript');
    }

    const transcriptText = await transcriptResponse.text();
    console.log('Successfully retrieved transcript');

    return {
      transcript: transcriptText,
      title: title
    };
  } catch (error) {
    console.error('Error in getYouTubeTranscript:', error);
    throw error;
  }
}

export function extractVideoId(url: string): string {
  try {
    // Handle youtu.be URLs
    if (url.includes('youtu.be')) {
      const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
      if (match) return match[1];
    }
    
    // Handle youtube.com URLs
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com')) {
      // Handle watch URLs
      const searchParams = urlObj.searchParams.get('v');
      if (searchParams) return searchParams;
      
      // Handle embed URLs
      const pathMatch = urlObj.pathname.match(/embed\/([a-zA-Z0-9_-]{11})/);
      if (pathMatch) return pathMatch[1];
      
      // Handle v/ URLs
      const vMatch = urlObj.pathname.match(/v\/([a-zA-Z0-9_-]{11})/);
      if (vMatch) return vMatch[1];
    }
    
    throw new Error('Could not extract video ID from URL');
  } catch (error) {
    console.error('Error extracting video ID:', error);
    throw new Error('Invalid YouTube URL format');
  }
}