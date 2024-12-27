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

  console.log('Extracted video ID:', videoId);

  try {
    // First, get video details
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    const details = await detailsResponse.json();
    console.log('Video details response:', details);

    if (!details.items?.[0]) {
      throw new Error('Video not found');
    }

    const title = details.items[0]?.snippet?.title;
    const description = details.items[0]?.snippet?.description;

    // Then get captions
    const captionsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`
    );
    const captions = await captionsResponse.json();
    console.log('Captions response:', captions);

    if (!captions.items?.[0]) {
      console.error('No captions found:', captions);
      if (description) {
        console.log('Using video description as fallback');
        return {
          title,
          transcript: description
        };
      }
      throw new Error('No captions found for this video');
    }

    const captionId = captions.items[0].id;
    console.log('Found caption track ID:', captionId);

    // Get the full transcript
    const transcriptResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions/${captionId}?tfmt=srv3&key=${apiKey}`
    );

    if (!transcriptResponse.ok) {
      console.error('Failed to fetch transcript:', await transcriptResponse.text());
      if (description) {
        console.log('Using video description as fallback after transcript fetch failure');
        return {
          title,
          transcript: description
        };
      }
      throw new Error('Failed to fetch video transcript');
    }

    const transcriptData = await transcriptResponse.json();
    console.log('Successfully retrieved transcript');

    const transcriptText = transcriptData.events.map(event => event.segs.map(seg => seg.utf8).join('')).join('\n');

    return {
      title,
      transcript: transcriptText
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw new Error(`Failed to fetch YouTube data: ${error.message}`);
  }
}
