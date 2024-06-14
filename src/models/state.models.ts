import type { ConfigurationForm } from "~/models/configuration.models";
import type { SlideImage } from "~/models/slide.models";

export type State = ConfigurationForm & {
  currentSlide: number;
  slides: Array<SlideImage>;
  title: string;
  isFullscreen: boolean;
};
