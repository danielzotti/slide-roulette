import type { ConfigurationForm } from "~/models/configuration.models";

export type State = ConfigurationForm & {
  currentSlide: number;
  title: string;
  isFullscreen: boolean;
};
