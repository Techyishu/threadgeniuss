interface ThreadPreviewProps {
  generatedThread: string | null;
  contentType: string;
}

import { ThreadPreviewContainer } from "./thread/ThreadPreviewContainer";
import { LongTweetPreviewContainer } from "./thread/LongTweetPreviewContainer";

export const ThreadPreview = ({ generatedThread, contentType }: ThreadPreviewProps) => {
  const renderPreview = () => {
    switch (contentType) {
      case 'long_tweet':
        return <LongTweetPreviewContainer generatedContent={generatedThread} />;
      case 'thread':
        return <ThreadPreviewContainer generatedThread={generatedThread} />;
      default:
        return null;
    }
  };

  return renderPreview();
};