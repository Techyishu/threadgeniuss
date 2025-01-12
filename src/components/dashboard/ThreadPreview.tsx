interface ThreadPreviewProps {
  generatedThread: string | null;
  contentType?: string;
}

import { ThreadPreviewContainer } from "./thread/ThreadPreviewContainer";
import { RedditPreviewContainer } from "./thread/RedditPreviewContainer";
import { LongTweetPreviewContainer } from "./thread/LongTweetPreviewContainer";

export const ThreadPreview = ({ generatedThread, contentType = 'thread' }: ThreadPreviewProps) => {
  const renderPreview = () => {
    switch (contentType) {
      case 'reddit':
        return <RedditPreviewContainer generatedContent={generatedThread} />;
      case 'long_tweet':
        return <LongTweetPreviewContainer generatedContent={generatedThread} />;
      default:
        return <ThreadPreviewContainer generatedThread={generatedThread} />;
    }
  };

  return renderPreview();
};