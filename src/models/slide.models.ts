export interface SlideImage {
  id: string;
  source: "local" | "unsplash";
  url: string;
  orientation: "landscape" | "portrait";
  photographerName?: string;
  photographerNickname?: string;
  topic?: string;
}
