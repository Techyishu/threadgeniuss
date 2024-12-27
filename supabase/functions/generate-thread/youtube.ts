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

    // Then get captions
    const captionsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`
    );
    const captions = await captionsResponse.json();
    console.log('Captions response:', captions);

    // Check for presence of captions
    if (!captions.items?.[0]) {
      console.error('No captions found:', captions);
      throw new Error('No captions found for this video');
    }

    // Get the first available caption track
    const captionId = captions.items[0].id;
    console.log('Found caption track ID:', captionId);

    // Get the actual transcript
    const transcriptResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions/${captionId}?tfmt=ttml&key=${apiKey}`
    );

    if (!transcriptResponse.ok) {
      console.error('Failed to fetch transcript:', await transcriptResponse.text());
      throw new Error('Failed to fetch video transcript');
    }

    const transcriptText = await transcriptResponse.text();
    console.log('Successfully retrieved transcript');

    return {
      title,
      transcript: transcriptText
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw new Error(`Failed to fetch YouTube data: ${error.message}`);
  }
}
