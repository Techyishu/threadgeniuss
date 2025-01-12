export interface ThreadFormProps {
  profileData: any;
  isGenerating: boolean;
  onGenerate: (youtubeLink: string, tone: string, threadSize: string) => void;
}

export interface ProControlsProps {
  tone: string;
  setTone: (value: string) => void;
  threadSize: string;
  setThreadSize: (value: string) => void;
}