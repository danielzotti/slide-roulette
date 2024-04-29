// const baseUrl = "https://danielzotti.github.io/slide-roulette";
import type { State } from "~/models/state.models";

const baseUrl = "https://slide-roulette.danielzotti.it";

export const config = {
  baseUrl,
  title: "Slide Roulette",
  description: "A slide roulette app to test your improvising skills!",
  themeColor: "#d27c19",
  // manifest: '/manifest.json',
  // faviconUrl: '/static/icons/favicon.png',
  // faviconAppleUrl: '/static/icons/favicon-apple.png',
  apis: {
    randomImage: (orientation: State["orientation"]) =>
      `https://source.unsplash.com/${orientation === "landscape" ? "1280x720" : "720x1280"}?random`,
  },
  urls: {
    slides: "/slides",
  },
};
